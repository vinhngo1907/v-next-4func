"use client";

import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function Actions(
  { isHost, isFollowing, hostIdentity }: { isHost: boolean, isFollowing: boolean, hostIdentity: string }
) {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleUnfollow = () => {
    // startTransition(() => {
    //   onUnfollow(hostIdentity)
    //     .then((data) =>
    //       toast.success(`You have unfollowed ${data.following.username}.`)
    //     )
    //     .catch(() => toast.error("Something went wrong while unfollowing."));
    // });
  };

  const handleFollow = () => {

  }
  const toggleFollow = () => {
    if (!userId) return router.push("/sign-in");
    if (isHost) return;
    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    };

  }
  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}
export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}