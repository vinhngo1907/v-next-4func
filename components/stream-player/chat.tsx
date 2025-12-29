"use client";

import React from "react";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatFormSkeleton } from "./chat-form";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";

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
    const {variant}  = useChatSidebar(state => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const isOnline = participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline; 
    const reversedMessages = () => {

    }
    const onChange = () => {

    }

    const onSubmit = () => {

    }
    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList isHidden={isHidden} messages={[]}/>
                    {/* chat form */}
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
