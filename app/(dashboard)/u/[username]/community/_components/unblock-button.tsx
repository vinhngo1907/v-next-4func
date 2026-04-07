"use client";
import React, { useTransition } from "react";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function UnblockButton(
    { userId }: { userId: string }
) {
    const [isPending, startTransition] = useTransition();
    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((result) =>
                    toast.success(`User ${result.blocked.username} unblocked`)
                )
                .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <Button
            disabled={isPending} onClick={onClick}
            className="text-blue-500 w-full"
            variant="ghost">Unblock</Button>
    )
}