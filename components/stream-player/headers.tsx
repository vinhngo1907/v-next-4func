"use client";

import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { Skeleton } from "../ui/skeleton";
import { UserAvatarSkeleton } from "../user-avatar";
import { Actions, ActionsSkeleton } from "./actions";

export function HeaderSkeleton() {
	return (
		<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
			<div className="flex items-center gap-x-2">
				<UserAvatarSkeleton size="lg" />
				<div className="space-y-2">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-4 w-24" />
				</div>
			</div>
			<ActionsSkeleton />
		</div>
	)
}

export function Header(
	{ hostIdentity, hostName, imageUrl, isFollowing, name, viewerIdentity }: {
		hostIdentity: string, hostName: string,
		imageUrl: string, isFollowing: boolean,
		name: string,
		viewerIdentity: string
	}
) {

	const participants = useParticipants();
	const participant = useRemoteParticipant(hostIdentity);
	const isLive = !!participants;
	const participantCount = participants.length - 1;
	const hostAsViewer = `host-${hostIdentity}`;
	const isHost = hostAsViewer === viewerIdentity

	return (
		<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
			<div className="flex items-center gap-x-3"></div>
			<Actions
				isHost={isHost}
				isFollowing={isFollowing}
				hostIdentity={hostIdentity}
			/>
		</div>
	);
}