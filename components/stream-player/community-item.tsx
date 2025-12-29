"use client";

import { cn } from "@/lib/utils";
import { useTransition } from "react";

export function CommunityItem({ }) {
    const [isPending, startTransition] = useTransition();
    return (
        <div
            className={cn(
                "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
                isPending && "opacity-50 pointer-events-none"
            )}
        >
            COmmunity Item
        </div>
    )
}