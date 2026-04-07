import React from "react";
import { StreamPlayer } from "@/components/stream-player";
import { isBlockedByUser } from "@/lib/block-service";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params; // ✅
  
  return {
    title: username,
  };
}

export default async function UserPage({ params }: UserPageProps)  {
   const { username } = await params;
	const user = await getUserByUsername(username);

  if (!user || !user.stream) notFound();

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) notFound();

  return (
    <StreamPlayer user={user} isFollowing={isFollowing} stream={user.stream} />
  );
}