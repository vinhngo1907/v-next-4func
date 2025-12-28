"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
export function ChatList({
}) {
    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
            Chat list messages
        </div>

    )
}

export function ChatListSkeleton() {
    return (
        <div className="flex h-full items-center justify-center">
            <Skeleton className="w-1/2 h-6" />
        </div>
    );
}
