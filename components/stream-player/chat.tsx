"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}
export function Chat(
    {
        hostName,
        hostIdentity,
        viewerName,
        isFollowing,
        isChatEnabled,
        isChatDelayed,
        isChatFollowersOnly,
    }: ChatProps
) {
    const matches = useMediaQuery("max-width: 1024px");
    const { variant, onExpand } = useChatSidebar(state => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    
    const isOnline = participant && connectionState === ConnectionState.Connected;
    
    const isHidden = !isChatEnabled || !isOnline;
    
    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();

    
    const onSubmit = () => {
        if (!send) return;
        send(value);
        setValue("")
    }
    
    useEffect(() => {
        if(matches) {
            onExpand();
        }
    },[matches, onExpand])
    
    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages]);
    
    const onChange = (value: string) => { setValue(value) }
    
    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList isHidden={isHidden} messages={reversedMessages} />
                    <ChatForm
                        onSubmit={onSubmit}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowing={isFollowing}
                        isDelayed={isChatDelayed}
                        isFollowersOnly={isChatFollowersOnly}
                        value={value}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <>
                    <ChatCommunity
                        hostName={hostName}
                        viewerName={viewerName}
                        isHidden={isHidden}
                    />
                </>
            )}
        </div>
    )
}

export function ChatSkeleton() {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    );
}
