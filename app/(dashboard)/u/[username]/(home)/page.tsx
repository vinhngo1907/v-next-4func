import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";

export default async function CreatorPage(props: { params: { username: string } }) {
 const { params } = props; 
  const {username} = await params;
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
}
