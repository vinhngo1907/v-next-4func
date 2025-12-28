"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

export function ChatHeaderSkeleton() {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="h-6 w-6 left-3 top-3" />
      <Skeleton className="h-6 w-28 left-3 mx-auto" />
    </div>
  );
}
