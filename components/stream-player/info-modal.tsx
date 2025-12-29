"use client";

import React, { ChangeEvent, ElementRef, FormEvent, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function InfoModal(
    { initialName, initialThumbnailUrl }: {
        initialName: string, initialThumbnailUrl: string | null;
    }
) {
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const [name, setName] = useState(initialName || "")
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl || "")

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
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