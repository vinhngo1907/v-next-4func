"use client";

import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";
import { Follow, User } from "@prisma/client";

export function FollowingSkeleton() {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
}

interface FollowProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[]
}

export function Following({ data }: FollowProps) {
  const { collapsed } = useSidebar(state => state);
  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map(result => (
          <UserItem
            key={result.following.id}
            username={result.following.username}
            imageUrl={result.following.imageUrl}
            isLive={result.following.stream?.isLive} />
        ))}
      </ul>
    </div>
  )
}