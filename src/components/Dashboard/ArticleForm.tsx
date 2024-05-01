import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { ArticleTypes } from "@/utils/types/Types";
import Gallery from "./Gallery";
import { toast } from "react-hot-toast";
import { AddNewArticle } from "@/utils/firebase";

type Props = {
  hideForm: () => void;
  formType: "AddNew" | "Edit";
  articleData?: ArticleTypes;
};

export default function ArticleForm({
  hideForm,
  formType = "AddNew",
  articleData = {
    title: "",
    categories: [""],
    coverImage: "",
    date: "",
    shortDescription: "",
    slug: "",
    content: "Start writing your article here",
  },
}: Props) {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState(articleData.title);
  const [categories, setCategories] = useState(
    articleData.categories.join(", ")
  );
  const [coverImage, setCoverImage] = useState(articleData.coverImage);
  const [date, setDate] = useState(articleData.date);
  const [shortDescription, setShortDescription] = useState(
    articleData.shortDescription
  );
  const [slug, setSlug] = useState(articleData.slug);
  const [articleContent, setArticleContent] = useState(articleData.content);

  const [submittingForm, setSubmittingForm] = useState(false);

  const GalleryDialogRef = useRef<HTMLDialogElement>(null);
  const [showGallery, setShowGallery] = useState(false);

  // Error States for Inputs Validation
  const [isTitleError, setIsTitleError] = useState(false);
  const [isCategoriesError, setIsCategoriesError] = useState(false);
  const [isCoverImageError, setIsCoverImageError] = useState(false);
  const [isShortDescriptionError, setIsShortDescriptionError] = useState(false);
  const [isSlugError, setIsSlugError] = useState(false);
  const [isArticleContentError, setIsArticleContentError] = useState(false);

  const urlRegix = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

  const PublishArticle = async () => {
    if (
      title &&
      categories &&
      coverImage &&
      urlRegix.test(coverImage) &&
      shortDescription &&
      slug &&
      articleContent
    ) {
      setSubmittingForm(true);
      const res = await AddNewArticle({
        title: title,
        slug: slug,
        shortDescription: shortDescription,
        date: new Date().toISOString(),
        categories: categories.split(","),
        content: articleContent,
        coverImage: coverImage,
      });
      setSubmittingForm(false);
      if (res.result === "success") {
        toast.success(res.message);
        hideForm();
      } else if (res.result === "error") {
        toast.error(res.message);
      }
    } else {
      if (!title) {
        setIsTitleError(true);
        toast.error("Enter Title");
      }

      if (!categories) {
        setIsCategoriesError(true);
        toast.error("Enter Categories");
      }

      if (!coverImage) {
        setIsCoverImageError(true);
        toast.error("Enter Cover Image Link or select from Gallery", {
          id: "coverImageErrorToast",
        });
      }
      if (coverImage && !urlRegix.test(coverImage)) {
        setIsCoverImageError(true);
        toast.error("Enter Cover Image Link or select from Gallery", {
          id: "coverImageErrorToast",
        });
      }

      if (!shortDescription) {
        setIsShortDescriptionError(true);
        toast.error("Enter Short Description");
      }

      if (!slug) {
        setIsSlugError(true);
        toast.error("Enter Slug");
      }
      if (!articleContent) {
        setIsArticleContentError(true);
        toast.error("Enter Article Content");
      }
    }
  };
  const UpdateArticle = () => {};

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (formType === "Edit") {
          UpdateArticle();
        } else if (formType === "AddNew") {
          PublishArticle();
        }
      }}
      className="mt-5"
    >
      <div className="flex items-center gap-x-2.5">
        <button
          className="w-fit h-fit"
          onClick={() => {
            hideForm();
          }}
        >
          <BsArrowLeft className="text-3xl" />
        </button>
        <h1 className="text-2xl font-semibold my-3">
          {formType === "Edit" ? "Update" : "Add New"}
          Article
        </h1>
      </div>
      <section className="grid grid-cols-1 gap-5">
        <div className="w-full">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className={`block w-full p-4  border  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/40 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:placeholder:opacity-0 ${
              isTitleError
                ? "text-red-500 border-red-500"
                : "text-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
            }`}
            placeholder="Article Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsTitleError(false);
            }}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="slug"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Slug{" "}
            <span
              className="ml-2 cursor-pointer underline underline-offset-4 font-medium text-light-primary dark:text-dark-primary"
              onClick={() => {
                const generatedSlug = title
                  ?.replaceAll(" ", "-")
                  ?.toLowerCase();
                setSlug(generatedSlug);
              }}
            >
              Generate Form Title
            </span>
          </label>
          <input
            type="text"
            id="slug"
            className={`block w-full p-4  border  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/40 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:placeholder:opacity-0 ${
              isSlugError
                ? "text-red-500 border-red-500"
                : "text-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
            }`}
            placeholder="URL for the article"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setIsSlugError(false);
            }}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="categories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Categories
            <span className="ml-2 font-normal text-gray-900 dark:text-white">
              (Seperate categories with comma ,)
            </span>
          </label>
          <input
            type="text"
            id="categories"
            className={`block w-full p-4  border  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/40 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:placeholder:opacity-0 ${
              isCategoriesError
                ? "text-red-500 border-red-500"
                : "text-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
            }`}
            placeholder="category 1, category 2"
            value={categories}
            onChange={(e) => {
              setCategories(e.target.value.toLowerCase());
              setIsCategoriesError(false);
            }}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="Short-Description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Short Description
          </label>
          <input
            type="text"
            id="Short-Description"
            className={`block w-full p-4  border  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/40 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:placeholder:opacity-0 ${
              isShortDescriptionError
                ? "text-red-500 border-red-500"
                : "text-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
            }`}
            placeholder="Short Description for Meta Data"
            value={shortDescription}
            onChange={(e) => {
              setShortDescription(e.target.value);
              setIsShortDescriptionError(false);
            }}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="Cover-Image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cover Image{" "}
            <span
              className="ml-2 cursor-pointer underline underline-offset-4 font-medium text-light-primary dark:text-dark-primary"
              onClick={() => {
                setShowGallery(true);
                GalleryDialogRef.current?.showModal();
              }}
            >
              Upload or Select from Gallery
            </span>
          </label>

          <input
            type="url"
            id="Cover-Image"
            className={`block w-full p-4  border  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/40 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:placeholder:opacity-0 ${
              isCoverImageError
                ? "text-red-500 border-red-500"
                : "text-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
            }`}
            placeholder="Enter URL of Image"
            value={coverImage}
            onChange={(e) => {
              setCoverImage(e.target.value);
              setIsCoverImageError(false);
            }}
          />
        </div>
        <section
          className={`min-h-[500px] ${
            isArticleContentError ? "border border-red-400" : ""
          }`}
        >
          <div>
            <label
              htmlFor="ArticleContent"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Article Content
            </label>
          </div>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_Editor_KEY}
            init={{
              height: 700,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
            ref={editorRef}
            value={articleContent}
            onEditorChange={(newValue, editor) => {
              setArticleContent(newValue);
              setIsArticleContentError(false);
            }}
          />
        </section>

        <section className="flex justify-end mb-16">
          <button
            className="py-2.5 px-5 me-2 mb-2 text-base font-medium text-light-bg dark:text-dark-bg focus:outline-none bg-light-primary dark:bg-dark-primary rounded-lg disabled:cursor-not-allowed"
            type="submit"
            disabled={submittingForm}
          >
            {formType === "Edit"
              ? submittingForm
                ? "Updating..."
                : "Update Article"
              : submittingForm
              ? "Publishing..."
              : "Publish Article"}
          </button>
        </section>
      </section>

      {/* Gallery Dialog */}
      <dialog
        ref={GalleryDialogRef}
        className="w-full max-w-4xl rounded-2xl bg-white"
      >
        <section className="relative py-5 px-5 w-full">
          <p className="text-center text-xl font-bold">
            Upload Or Select from existing
          </p>
          <button
            className="absolute top-3 right-3 w-7 h-7 aspect-square rounded-full border-2 border-black text-black flex justify-center items-center"
            onClick={() => {
              GalleryDialogRef.current?.close();
              setShowGallery(false);
            }}
          >
            <IoIosClose className="text-3xl" />
          </button>
          {showGallery && (
            <Gallery
              type="component"
              actionAfterImageSelect={(imageLink) => {
                setCoverImage(imageLink);
                GalleryDialogRef.current?.close();
              }}
            />
          )}
        </section>
      </dialog>
    </form>
  );
}

{
  /*

<div className="w-full">
          <label
            htmlFor=""
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Large input
          </label>
          <input
            type="text"
            id=""
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/40 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

*/
}
