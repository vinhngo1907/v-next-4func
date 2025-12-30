"use client";

import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { useDebounceValue } from "usehooks-ts";
import { CommunityItem } from "./community-item";
import { ScrollArea } from "../ui/scroll-area";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useParticipants } from "@livekit/components-react";

export function ChatCommunity(
    { hostName, isHidden, viewerName }: { hostName: string, isHidden: boolean, viewerName: string }
) {
    const [value, setValue] = useState("")
    const debouncedValue = useDebounceValue<string>(value, 500);
    const onChange = (newValue: string) => { setValue(newValue) }
    const participants = useParticipants();
    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewr = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewr)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter((participant) =>
            participant.name?.toLowerCase().includes(debouncedValue.toString().toLowerCase())
        );
    }, [debouncedValue, participants]);
    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Community is disabled</p>
            </div>
        );
    }


    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search community"
                className="border-white/10" />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block">
                    No results
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    )
}