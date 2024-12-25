import { auth } from "@/auth"
import { PostFeedItem } from "@/lib/types"
import FeedOptions from "./FeedOptions"
import Image from "next/image"
import FeedActions from "./FeedActions"
import Link from "next/link"
import FeedHeader from "./FeedHeader"

const Post = async ({ post }: { post: PostFeedItem }) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) return null

  return (
    <article className="flex w-full flex-col space-y-4 rounded bg-card px-3 py-4 shadow-md">
      <div className="flex items-center justify-between sm:px-0">
        <FeedHeader
          date={post.createdAt}
          description="پست منتشر کرد"
          user={session.user}
          timeFormat="relative"
          // TODO fix User schema in prisma to have name always in both oath and credentials
          username={post.user.name || "ناشناس"}
        />

        <FeedOptions userId={userId} feed={post} />
      </div>

      <div className="relative w-full overflow-hidden rounded-sm">
        <h2 className="my-2">{post.title}</h2>
        <Link href={`/posts/${post.id}`}>
          <Image
            className="aspect-video rounded-sm bg-center object-cover object-center"
            width={1600}
            height={900}
            src={post.image}
            alt={post.title}
          />
        </Link>
      </div>

      <FeedActions type={post.type} userId={userId} feed={post} />
    </article>
  )
}
export default Post
