"use client";
import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

export function UnblockButton(
    { userId }: { userId: string }
) {
    const [isPending, startTransition] = useTransition();
    const onClick = () => {
        onUnblock(userId)
            .then((data) => toast.success(`User ${data.blocked.username} unblocked`))
            .catch(() => toast.error("Something went wronh!!!"))
    }
    
    return (
        <Button
            disabled={isPending} onClick={onClick}
            className="text-blue-500 w-full"
            variant="ghost">Unblock</Button>
    )
}