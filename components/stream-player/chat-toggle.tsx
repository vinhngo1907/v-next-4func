import { useChatSidebar } from "@/store/use-chat-sidebar";
import React from "react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export function ChatToggle() {
    const { collapsed, onCollapse, onExpand } = useChatSidebar(state => state);
    const onToggle = () => {
        if (collapsed) { onExpand() }
        else {
            onCollapse();
        }
    }
    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
    const label = collapsed ? "Expand" : "Collapse";
    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    );
}