import z from "zod";
import { createTRPCRouter, orgProcedure } from "../init";
import { prisma } from "@/lib/db";

export const voicesRouter = createTRPCRouter({
    getAll: orgProcedure.input(
        z.object({
            query: z.string().trim().optional(),
        })).query(async ({ ctx, input }) => {
            const searchFilter = input?.query ? {
                or: [
                    {
                        name: { contains: input.query, mode: "insensitive" as const }
                    },
                    {
                        description: { contains: input.query, mode: "insensitive" as const }
                    }
                ]
            } : {};
            const [custom, system] = await Promise.all([
                prisma.voice.findMany({
                    where: { variant: "CUSTOM", orgId: ctx.orgId, ...searchFilter },
                    orderBy: { createdAt: 'desc' },
                    select: { id: true, category: true, description: true, name: true, language: true, variant: true }
                }),
                prisma.voice.findMany({
                    where: { variant: 'SYSTEM', ...searchFilter },
                    orderBy: { createdAt: "asc", },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category: true,
                        language: true,
                        variant: true,
                    }
                })
            ]);
            return { custom, system };
        }),
})