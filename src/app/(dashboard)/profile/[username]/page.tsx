const UserProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const username = (await params).username
  return <div>{username}</div>
}
export default UserProfilePage
