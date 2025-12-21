import { getSelf } from "./auth-service";
import { db } from "./db";

export const getStreams = async function () {
    let userId: string | null;
    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }

    let streams = [];
    if (userId) {
        streams = await db.stream.findMany({
            where: { user: { NOT: { blocking: { some: { blockedId: userId } } } } },
            select: { id: true, name: true, user: true, thumbnailUrl: true, isLive: true },
            orderBy: [{ isLive: 'desc' }, { updatedAt: "desc" }]
        })
    } else {
        streams = await db.stream.findMany({
            select: { isLive: true, id: true, thumbnailUrl: true, name: true, user: true },
            orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
        });
    }

    return streams;
}