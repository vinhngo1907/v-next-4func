import { db } from "./db";

export const getUserByUsername = async function (username: string) {
  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      externalUserId: true,
      username: true,
      bio: true,
      imageUrl: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        }
      },
      _count: {
        select: {
          followedBy: true
        }
      }
    }
  });

  return user;
}

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id }
  })
}