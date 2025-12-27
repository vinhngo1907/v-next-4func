"use server";


import {
    IngressClient,
    RoomServiceClient,
    type CreateIngressOptions,
} from "livekit-server-sdk";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET
);


const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngress = async function(hostId: string) {
    const ingresses = await ingressClient.listIngress({
        roomName: hostId
    });
}