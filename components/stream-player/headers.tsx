"use client";

import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { Skeleton } from "../ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import { Actions, ActionsSkeleton } from "./actions";
import { UserIcon } from "lucide-react";
import { VerifiedMark } from "../verified-mark";

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
			<div className="flex items-center gap-x-3">
				<UserAvatar
					imageUrl={imageUrl}
					isLive={isLive} size="lg" showBadge username={hostName}
				/>
				<div className="spac-y-1">
					<div className="flex items-center gap-x-2">
						<h2 className="text-lg font-semibold">{hostName}</h2>
						<VerifiedMark />
					</div>
					<p className="text-sm font-semibold">{name}</p>
					{isLive ? (
						<div className="font-semibold flex gap-x-1 items-center text-xs text-rose">
							<UserIcon className="h-4 w-4" />
							<p>
								{participantCount}{""}
								{participantCount===1 ? "viewer" : "vierwers"}
							</p>
						</div>
					) : (
						<p className="font-semibold text-xs text-muted-foreground">
							Offline
						</p>
					)}
				</div>
			</div>
			<Actions
				isHost={isHost}
				isFollowing={isFollowing}
				hostIdentity={hostIdentity}
			/>
		</div>
	);
}