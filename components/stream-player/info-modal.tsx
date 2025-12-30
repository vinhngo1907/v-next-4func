"use client";

import React, { ChangeEvent, ElementRef, FormEvent, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
// import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export function InfoModal(
    { initialName, initialThumbnailUrl }: {
        initialName: string, initialThumbnailUrl: string | null;
    }
) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const closeRef = useRef<ElementRef<"button">>(null);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    toast.success("Stream updated");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    }
    const [name, setName] = useState(initialName || "")
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl || "")

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success("Stream thumbnail updated");
                    setThumbnailUrl("");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            disabled={isPending}
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumnail</Label>
                        {
                            thumbnailUrl ? (
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                    <div className="absolute top-2 right-2 z-[10]">
                                        <Hint label="Remove thumbnail" asChild side="left">
                                            <Button
                                                type="button"
                                                disabled={isPending}
                                                onClick={onRemove}
                                                className="h-auto w-auto p-1.5"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </Hint>
                                    </div>
                                    <Image
                                        alt="Thumbnail"
                                        src={thumbnailUrl}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-xl border outline-dashed outline-muted">
                                    <UploadDropzone
                                        endpoint="thumbnailUploader"
                                        appearance={{
                                            label: {
                                                color: "#FFFFFF",
                                            },
                                            allowedContent: {
                                                color: "#FFFFFF",
                                            },
                                        }}
                                        onClientUploadComplete={(res) => {
                                            setThumbnailUrl(res?.[0]?.url);
                                            router.refresh();
                                            closeRef?.current?.click();
                                        }}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}