import { auth } from "@/auth"
import { PostFeedItem, safeUser } from "@/lib/types"
import UserAvatar from "./UserAvatar"
import TimeAgo from "./TimeAgo"
import FeedActions from "./FeedAction"

const Post = async ({ post }: { post: PostFeedItem }) => {
  const session = await auth()
  const userId = session?.user.id
  const username = post.user.name

  if (!session) return null

  return (
    <article className="flex w-full flex-col space-y-3 rounded bg-card px-3 py-4 shadow-md">
      <div className="flex items-center justify-between sm:px-0">
        <div className="flex items-center gap-x-3">
          <UserAvatar user={session.user} />
          <div className="flex flex-col gap-1 text-xs">
            <p className="flex items-baseline gap-2 leading-[0]">
              <span className="font-semibold">{post.user.name}</span>
              <span className="text-sm font-light text-gray-600 dark:text-gray-300">
                پست منشر کرد
              </span>
            </p>
            <TimeAgo date={post.createdAt} />
          </div>
        </div>

        <FeedActions<PostFeedItem> user={session.user} feed={post} />
      </div>
    </article>
  )
}
export default Post
