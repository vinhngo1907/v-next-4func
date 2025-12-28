"use client";

import React from "react";
import { ChatListSkeleton } from "./chat-list";
import { ChatHeaderSkeleton } from "./chat-header";
import { ChatFormSkeleton } from "./chat-form";

export function Chat() {
    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            Chat
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
