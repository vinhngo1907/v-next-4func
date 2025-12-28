"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

export function Video({ hostIdentity, hostName }: { hostIdentity: string, hostName: string }) {
    return (
        <div className="aspect-video border-b group relative"></div>
    )
}

export function VideoSkeleton() {
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="h-full w-full rounded-none" />
        </div>
    );
}
