import PostsGrid from "@/components/PostsGrid"
import { fetchPostsByUsername } from "@/data/post"

const UserProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const username = (await params).username
  const posts = await fetchPostsByUsername(username)

  return (
    <div>
      <PostsGrid posts={posts} />
    </div>
  )
}
export default UserProfilePage
