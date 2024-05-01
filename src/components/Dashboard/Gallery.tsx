/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { GetAllImages, SaveImageURLToDB } from "@/utils/firebase";
import Image from "next/image";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import LoadingIndicator from "../LoadingIndicator";
import { GoLink } from 'react-icons/go';
import { toast } from "react-hot-toast"

type Props = {
  type: "component" | "page";
  actionAfterImageSelect?: (imageLink: string) => void;
};

const baseStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  padding: "50px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "rgba(55, 65, 81, 0.6)",
  borderStyle: "dashed",
  backgroundColor: "rgba(55, 65, 81, 0.1)",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function Gallery({ type, actionAfterImageSelect = () => { } }: Props) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [fetchingImages, setFetchingImages] = useState(true);
  const [images, setImages] = useState<any[]>([]);

  const fetchAllImages = async () => {
    setFetchingImages(true);
    const res = await GetAllImages();

    if (res?.result === "success") {
      setImages(res.images);
      setFetchingImages(false);
    } else if (res?.result === "error") {
      setImages([]);
      setFetchingImages(false);
    }
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/gif": [],
        "image/webp": [],
      },
      maxFiles: 1,
      disabled: uploadingImage,
      onDrop: (acceptedFiles) => {
        setUploadingImage(true);
        const fileName = `${acceptedFiles[0].name}-${new Date().toISOString()}`;
        const imageUrl = uploadFileToS3({
          file: acceptedFiles[0],
          fileName: fileName,
          folderName: "images"
        })

        imageUrl.then((res) => {
          if (res.image) {
            SaveImageURLToDB(res.image, `images/${fileName}`)
            const array = [{
              imageUrl: res.image,
              fullPath: `images/${fileName}`
            }, ...images];
            setImages(array);

          }
          setUploadingImage(false);
        });

      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    fetchAllImages();
  }, []);

  useEffect(() => {
    console.log("Image state changed", images)
  }, [images]);

  if (fetchingImages) {
    return (
      <section className="flex justify-center items-center my-3 h-96 overflow-auto p-3">
        <LoadingIndicator showText text="Fetching Images" loaderClassNames="w-8 h-8 border-t-black dark:border-t-white" />
      </section>
    )
  }

  return (
    <section className={`grid grid-cols-3 gap-3 my-3 overflow-auto p-3 ${type === "component" ? "h-96" : ""}`}>
      <section className="col-span-full">
        <div className="container">
          <div {...getRootProps({ style })} className="flex-col" >
            <input {...getInputProps()} />
            <p className="text-center w-full">
              {!uploadingImage && "Drag & drop some files here, or click to select files"}
            </p>
            {uploadingImage && (
              <LoadingIndicator showText text="Uploading Image" loaderClassNames="w-8 h-8 border-t-black dark:border-t-white" />
            )}
          </div>
        </div>
      </section>

      {images.length > 0 && images.map((image, index) => {
        return (
          <div key={index} className="w-full h-52 relative overflow-hidden group">
            <img src={image?.imageUrl} alt="Gallery items" className="w-full h-full object-cover" />
            <section className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 transition-all ease-in-out duration-200">
              <button type="button" className="w-10 h-10 aspect-square flex justify-center items-center bg-white rounded-full"
                onClick={() => {
                  navigator.clipboard.writeText(image?.imageUrl);
                  toast.success("Copied image link to clipboard");
                  actionAfterImageSelect(image?.imageUrl)
                }}
              >
                <GoLink className="text-2xl text-black" />
              </button>
            </section>
          </div>
        );
      })}
    </section>
  );
}
