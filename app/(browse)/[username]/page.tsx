interface UserPageProps {
    params: {username: string};
}

export default async function UserPage({
    params: {username}
}: UserPageProps) {
    return (
        <div></div>
    )
}