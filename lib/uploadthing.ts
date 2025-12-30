// lib/uploadthing.ts
import { generateReactHelpers, generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();