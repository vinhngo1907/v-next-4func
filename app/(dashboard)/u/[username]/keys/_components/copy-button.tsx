"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon, Copy } from "lucide-react";
import React, { useState } from "react";

export function CopyButton({ value }: { value: string | null }) {
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        if (!value) return;

        setIsCopied(true);
        navigator.clipboard.writeText(value);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000)

    }
    const Icon = isCopied ? CheckIcon : Copy
    return (
        <Button asChild variant="ghost" size="sm">
            <Icon className="h-4 w-4" />
        </Button>
    )
}