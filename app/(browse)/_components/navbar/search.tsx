"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import React from "react";

export function Search() {
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}
	return (
		<form onSubmit={onSubmit} className="relative w-full lg:w[400px] flex items-center">
			<Input
				placeholder="Search"
				className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
			/>
			<Button
				className="rounded-1-none"
				type="submit"
				size="sm"
				variant="secondary"
			>
				<SearchIcon className="h-5 w-5 text-muted-foreground" />
			</Button>
		</form>
	)
}