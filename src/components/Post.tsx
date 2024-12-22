import { auth } from "@/auth"
import { PostFeedItem, safeUser } from "@/lib/types"
import UserAvatar from "./UserAvatar"
import TimeAgo from "./TimeAgo"
import FeedOptions from "./FeedOptions"
import { Card } from "./ui/card"
import Image from "next/image"
import FeedActions from "./FeedActions"

const Post = async ({ post }: { post: PostFeedItem }) => {
  const session = await auth()
  const userId = session?.user.id
  const username = post.user.name

  if (!userId) return null

  return (
    <article className="flex w-full flex-col space-y-4 rounded bg-card px-3 py-4 shadow-md">
      <div className="flex items-center justify-between sm:px-0">
        <div className="flex items-center gap-x-3">
          <UserAvatar user={session.user} />
          <div className="flex flex-col gap-1 text-xs">
            <p className="flex items-baseline gap-2 leading-[0]">
              <span className="font-semibold">{post.user.name}</span>
              <span className="text-sm font-light text-muted-foreground">پست منشر کرد</span>
            </p>
            <TimeAgo date={post.createdAt} />
          </div>
        </div>

        <FeedOptions userId={userId} feed={post} />
      </div>

      <div className="relative w-full overflow-hidden rounded-sm">
        <Image
          className="aspect-video bg-center object-contain object-center"
          width={1600}
          height={900}
          src={post.image}
          alt="post image"
        />
      </div>

      <FeedActions userId={userId} feed={post} />
    </article>
  )
}
export default Post
