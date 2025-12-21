import React from "react";

import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";

export default async function CreatorPage({
  params:{username}
}:{
  params: {username: string}
}) {
  return (
    <div className="h-full">
      {/* <StreamPlayer user={user} /> */}
    </div>
  );
}
