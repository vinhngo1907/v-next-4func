import { ChatHeader } from "@/components/chat/chat-header";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        channelId: string;
        serverId: string
    }
}
export default async function ChannelIdPage(
    { params}: ChannelIdPageProps
) {
    const { channelId, serverId } = await params;
    const profile = await currentProfile();

    if (!profile) return redirect('/sign-in');

    const channel = await db.channel.findUnique({
        where: { id: channelId }
    });

    const member = await db.member.findFirst({
        where: { serverId: serverId, profileId: profile.id }
    });
    if (!channel || !member) return redirect("/");

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            Channel Id page
        </div>
    )
}