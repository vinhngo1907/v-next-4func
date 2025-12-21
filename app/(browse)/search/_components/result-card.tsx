import { User } from "@clerk/nextjs/server";
import Link from "next/link";

interface ResultCardProps {
	id: string;
	name: string;
	thumnailUrl: string;
	isLive: boolean;
	updatedAt: Date;
	user: User;
}

export function ResultCard({
	data,
}: { data: ResultCardProps }) {
	return (
		<Link href={`${data.user.username}`}>
			<div className="flex w-full gap-x-4"></div>
		</Link>
	)
}