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