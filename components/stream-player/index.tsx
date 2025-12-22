"use client";
import React from "react";
import { HeaderSkeleton } from "./headers";

export function StreamPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        {/* <VideoSkeleton />*/}
        <HeaderSkeleton /> 
      </div>
      <div className="col-span-1 bg-background">
        {/* <ChatSkeleton /> */}
      </div>
    </div>
  );
}
type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  stream: CustomStream | null;
  imageUrl: string;
  _count: {
    followedBy: number;
  }
}

type CustomStream = {
  id: string;
  isLive: boolean;
  isChatEnabled: boolean;
  thumbnailUrl: string;
  name: string;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
}

export function StreamPlayer({ user, stream, isFollowing }: {
  user: CustomUser,
  stream: CustomStream,
  isFollowing: boolean
}) {
  //  const { collapsed } = useChatSidebar((state) => state);
  return (
    <div>Streamer Player</div>
  )
}