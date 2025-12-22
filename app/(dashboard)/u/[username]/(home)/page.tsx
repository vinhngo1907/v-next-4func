import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getSelfByUsername } from "@/lib/auth-service";
import { StreamPlayer } from "@/components/stream-player";

export default async function CreatorPage({
  params:{username}
}:{
  params: {username: string}
}) {
  const externalUser = await currentUser();
  const user = await getSelfByUsername(username);
   if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      Stream Player
      {/* <StreamPlayer user={user} stream={user.stream} isFollowing={true}/> */}
    </div>
  );
}
