import { getSelf } from "./auth-service"
import { db } from "./db";

export const blockUser = async function (userId: string) {
    const self = await getSelf();
    if (!self || !self.username) throw new Error("Unauthorized");

    if (self.id === userId) throw new Error("Bad request, Can not block yourself!!!")

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("Not found");

    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: user.id
            }
        }
    });
    if (existingBlock) throw new Error("User is alread blocked");

    await db.block.create({
        data: { blockedId: user.id, blockerId: self.id },
        include: { blocked: true }
    });
}

export const getBlockedUsers = async function () {
    const self = await getSelf();
    if (!self || !self.username) throw new Error("Unauthorized");

    const users = await db.block.findMany({
        where: { blockerId: self.id },
        include: { blocked: true }
    });

    return users;
}

export const isBlockedByUser = async function (id: string) {
    try {
        const self = await getSelf();
        const otherUser = await db.user.findUnique({ where: { id } });
        if (!otherUser) throw new Error("User not found");

        if (otherUser.id === self.id) return false;

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id
                }
            }
        });
        return !!existingBlock;
    } catch {
        return false;
    }
}