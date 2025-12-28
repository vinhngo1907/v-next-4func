"use client";

import React from "react";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { Hint } from "../hint";
import { Users, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export function VariantToggle() {
    const { variant, onChangeVariant } = useChatSidebar(state => state);
    const isChat = variant === ChatVariant.CHAT
    const Icon = isChat ? Users : MessageSquare;
    const label = isChat ? "Community" : "Go back to chat";
    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
        onChangeVariant(newVariant);
    }
    return (
        <Hint asChild label={label} side="left">
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    )
}