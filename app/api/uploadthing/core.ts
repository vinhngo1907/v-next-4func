// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

const ut = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: ut({
    image: {
      maxFileCount: 1,
      maxFileSize: "4MB",
    },
  })
    .middleware(async () => {
      const self = await getSelf();
      if (!self) {
        throw new Error("Unauthorized");
      }

      return { userId: self.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      await db.stream.update({
        where: { userId: metadata.userId },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return {
        success: true,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
