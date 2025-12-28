import React from "react";
import { Hint } from "../hint";
import { Maximize, Minimize } from "lucide-react";

export function FulscreenControl(
    {
        isFullscreen, onToggle
    }: {
        isFullscreen: boolean,
        onToggle: () => void
    }) {
    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
    return (
        <div className="flex items-center gap-4">
            <Hint asChild label={label}>
                <button className="text-white p-1.5 hover:bg-white/10 rounded-lg">
                    <Icon className="h-5 w-5" />
                </button>
            </Hint>
        </div>
    )
}