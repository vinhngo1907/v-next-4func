"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Hint } from "../hint";
import { Slider } from "../ui/slider";

export function VolumeControl(
    { onChange, value, onToggle }:
        { onChange: (value: number) => void; value: number; onToggle: () => void }
) {
    const isMuted = value === 0;
    const label = isMuted ? "Unmute" : "Mute";
    const isAboveHalf = value > 50;
    const Icon = isMuted ?  VolumeX : (isAboveHalf ? Volume2 : Volume1);

    const handleChange = (value: number[]) => {
        onChange(value[0])
    }
    return (
        <div className="flex items-center gap-2">
            <Hint asChild label={label}>
                <button
                    onClick={onToggle}
                    className="text-white hover:bg-white/10 p-1.5 rounded-lg"
                >
                    <Icon className="h-6 w-6" />
                </button>
            </Hint>
            <Slider
                className="w-[8rem] cursor-pointer"
                onValueChange={handleChange} max={100} value={[value]} step={1}
            />
        </div>
    )
}