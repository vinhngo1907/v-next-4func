import { auth } from "@clerk/nextjs/server";
import { parseBuffer } from "music-metadata";
import z from "zod";
import { VOICE_CATEGORIES } from "@/features/voices/data/voice-categories";
import type { VoiceCategory } from "@/generated/prisma/client";
import { polar } from "@/lib/polar";

const createVoiceSchema = z.object({
    name: z.string().min(1, "Voice name is required"),
    category: z.enum(VOICE_CATEGORIES as [VoiceCategory, ...VoiceCategory[]]),
    language: z.string().min(1, "Language is required"),
    description: z.string().nullish()
});

const MAX_UPLOAD_SIZE_BYTES = 20 * 1024 * 1024; //20MB
const MIN_AUDIO_DURATION_SECONDS = 10;

export async function POST(request: Request) {
    const { userId, orgId } = await auth()
    if (!userId || !orgId) { return Response.json({ error: "Unauthorized" }, { status: 401 }) }

    try {
        const customerState = await polar.customers.getStateExternal({ externalId: orgId });
        const hasActiveSubscription = (customerState.activeSubscriptions ?? []).length > 0;
        if (!hasActiveSubscription) {
            return Response.json({ error: "SUBSCRIPTION_REQUIRED", status: 403 })
        }
    } catch (error: any) {
        return Response.json({ error: "SUBSCRIPTION_REQUIRED", status: 403 });
    }

    const url = new URL(request.url);

    const validation = createVoiceSchema.safeParse({
        name: url.searchParams.get("name"),
        category: url.searchParams.get("category"),
        description: url.searchParams.get("description"),
        lanaguage: url.searchParams.get("lanaguage"),
    });

    if (!validation.success) {
        return Response.json(
            {
                error: "Invalid input",
                issues: validation.error.issues,
            },
            { status: 400 },
        );
    }

    const { name, category, language, description } = validation.data

    const fileBuffer = await request.arrayBuffer();
    if (!fileBuffer.byteLength) {
        return Response.json(
            { error: "Please upload an audio file" },
            { status: 403 }
        );
    }

    if (fileBuffer.byteLength > MAX_UPLOAD_SIZE_BYTES) {
        return Response.json(
            { error: "Audio file exceeds the 20 MB size limit" },
            { status: 413 },
        );
    }

    const contentType = request.headers.get('content-type');
    if (!contentType) {
        return Response.json({ error: "Missong Content-Type header" }, { status: 400 })
    }

    const normalizeContentType = contentType.split(';')[0]?.trim() || "audio/wav";

    // Validate audio format and duration
    let duration: number;
    try {
        const metadata = await parseBuffer(
            new Uint8Array(fileBuffer),
            { mimeType: normalizeContentType },
            { duration: true }
        );

        duration = metadata.format.duration ?? 0;
    } catch {
        return Response.json({ error: "File is not valid audio file" }, { status: 422 })
    }

    if (duration < MIN_AUDIO_DURATION_SECONDS) {
        return Response.json(
            {
                error: `Audio too short (${duration.toFixed(1)}s). Minimum duration is ${MIN_AUDIO_DURATION_SECONDS} seconds.`,
            },
            { status: 422 },
        );
    }
    
    /**
     * Process voice
     */

    return Response.json(
        { name, message: "Voice created successfully" },
        { status: 201 },
    );
}