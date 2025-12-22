import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db";

export const getSelf = async () => {
	const self = await currentUser();
	if (!self || !self.username) {
		throw new Error("Unauthorized");
	}

	const user = await db.user.findUnique({
		where: { externalUserId: self.id }
	});

	if (!user) throw new Error("User not found or not authorized!!!");

	return user;
}

export const getSelfByUsername = async (username: string) => {
	// const self = await currentUser();
	// if (!self || !self.username) throw new Error("Unauthorized");
	// if (self.username !== username) {
	// 	throw new Error("Unauthorized");
	// }

	const user = await db.user.findUnique({
		where: { username },
		select: {
			id: true,
			externalUserId: true,
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
				},
			},
			_count: {
				select: {
					followedBy: true
				}
			}
		},
	});

	if (!user) throw new Error("User not found or not authorized!!!");

	return user;
}