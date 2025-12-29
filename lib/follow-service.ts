import { getSelf } from "./auth-service";
import { db } from "./db";

export const getFollowedUsers = async function () {
	try {
		const self = await getSelf();

		let followedUsers = [];
		followedUsers = await db.follow.findMany({
			where: {
				followerId: self.id,
				following: {
					blocking: {
						none: {
							blockedId: self.id
						}
					}
				}
			},
			include: {
				following: {
					include: {
						stream: {
							select: { isLive: true }
						}
					}
				}
			}
		})
		return followedUsers;
	} catch {
		return [];
	}
}

export const isFollowingUser = async function (id: string) {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({ where: { id } })

		if (!otherUser) throw new Error("User not found");

		if (otherUser.id == self.id) return true
		const existingFollow = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followingId: otherUser.id
			}
		});
		return !!existingFollow;
	} catch {
		return false;
	}
}

export const unfollowUser = async function (id: string) {
	const self = await getSelf();
	const otherUser = await db.user.findUnique({ where: { id } });

	if (!otherUser) throw new Error("User not found");

	if (self.id === otherUser.id) throw new Error("You can not unfollow yourself");

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id
		}
	});

	if (!existingFollow) throw new Error("You are not following this user");

	const follow = await db.follow.delete({
		where: { id: existingFollow.id },
		include: { following: true, follower: true }
	});

	return follow;
}

export const followUser = async function (id: string) {
	const self = await getSelf();
	const otherUser = await db.user.findUnique({ where: { id } });

	if (!otherUser) throw new Error("User not found!!!");

	if (self.id === otherUser.id) throw new Error("You can't not follow yourself");

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id
		}
	});

	if (existingFollow) throw new Error("You are following this user");

	const follow = await db.follow.create({
		data: {
			followerId: self.id,
			followingId: otherUser.id
		},
		include: { following: true }
	});

	return follow;
}