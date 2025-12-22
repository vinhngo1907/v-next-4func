import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let event: any;

  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Webhook verification failed", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const { type, data } = event;

  // ===== HANDLE EVENTS =====
  switch (type) {
    case "user.created": {
      await db.user.create({
        data: {
          externalUserId: data.id,
          username: data.username ?? data.email_addresses[0].email_address,
          imageUrl: data.image_url
        },
      });
      break;
    }

    case "user.updated": {
      await db.user.update({
        where: { externalUserId: data.id },
        data: {
          username: data.username ?? data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        },
      });
      break;
    }

    case "user.deleted": {
      await db.user.delete({
        where: { externalUserId: data.id },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
