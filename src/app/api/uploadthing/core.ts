// import { metadata } from "@/app/layout";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
//   define route for various different upload types
    postImage : f({
        image : {
            maxFileSize : "4MB",
            maxFileCount : 1
        }
    })
    .middleware(async () => {
        // this code run on server before the upload
        const { userId } = await auth();
        if(!userId) throw new Error("Unauthorized.");

        return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log("File uploaded", metadata);
        try {
            return { fileUrl : file.url};
        } catch (error) {
            console.error("Error in uploading Images", error)
            throw error;
        }
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
