"use client"
import { Skeleton } from "@/components/ui/skeleton";
import React, { useTransition } from "react";
import { toast } from "sonner";

export function ToggleCardSkeleton() {
  return <Skeleton className="rounded-xl p-10 w-full" />;
}
