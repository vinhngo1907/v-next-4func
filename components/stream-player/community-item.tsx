"use client";

import { cn, stringToColor } from "@/lib/utils";
import { useTransition } from "react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";

interface CommunityItemProps {
    viewerName: string;
    hostName: string;
    participantName: string | undefined;
    participantIdentity: string;
}
export function CommunityItem(
    { viewerName, hostName, participantName, participantIdentity }: CommunityItemProps
) {
    console.log({
        viewerName,
        hostName,
        participantName,
        participantIdentity
    })
    const isHost = viewerName === hostName;
    const isSelf = participantName === viewerName;
    const color = stringToColor(participantName || "");
    const [isPending, startTransition] = useTransition();
    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) return;
        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error(`Failed to block ${participantName}, Something went wrong`));
        });
    }
    return (
        <div
            className={cn(
                "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
                isPending && "opacity-50 pointer-events-none"
            )}
        >   <p style={{ color: color }}>{participantName}</p>
            {
                isHost && !isSelf && (
                    <Hint label="block">
                        <Button
                            variant="ghost"
                            disabled={isPending}
                            onClick={handleBlock}
                            className="h-auto w-auto p-1 opacity group-hover:opacity-100 transition"
                        >
                            <MinusCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </Hint>
                )
            }
        </div>
    )
}