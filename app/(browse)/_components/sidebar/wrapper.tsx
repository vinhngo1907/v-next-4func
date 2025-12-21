"use client";

import React from "react";
import { useSidebar } from "@/store/use-sidebar";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { FollowingSkeleton } from "./following";
import { RecommendedSkeleton } from "./recommended";
import { cn } from "@/lib/utils";

export function Wrapper({ children }: { children: React.ReactNode }) {
	const { collapsed } = useSidebar(state => state);
	const isClient = useIsClient();

	if (!isClient) {
		return (
			<aside className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50">
				<ToggleSkeleton />
				<FollowingSkeleton />
				<RecommendedSkeleton />
			</aside>
		)
	}

	return (
		<aside
			className={
				cn(
					"fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
					collapsed && "w-[70px]"
				)}>
			{children}
		</aside>
	)
}