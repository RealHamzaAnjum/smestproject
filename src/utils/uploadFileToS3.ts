import AWS from "aws-sdk";

AWS.config.region = process.env.NEXT_PUBLIC_S3_REGION;

type fileProps = {
    file: File;
    folderName: string;
    fileName: string;
}

export const uploadFileToS3 = async ({ file, fileName, folderName }: fileProps) => {

    const s3 = new AWS.S3({
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY ?? "",
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY ?? ""
        },
    });

    const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET ?? "",
        Key: `${folderName}/${fileName.replace(/[^a-zA-Z0-9]/g, "") + "-" + Date.now()}.${file.type.split("/")[1]
            }`,
        Body: file,
        ContentType: file.type,
    };

    try {
        const upload = await s3.upload(params).promise();

        return {
            image: `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${upload?.Key}`,
            status: true,
            message: "Image uploaded successfully",
        };
    } catch (error: any) {
        console.log(error);
        return {
            image: null,
            status: false,
            message: error.message || "Something went wrong",
        };
    }
};