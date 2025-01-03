import { PostFeedItem } from "@/lib/types"
import { HeartIcon, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

const PostsGrid = ({ posts }: { posts: PostFeedItem[] | null }) => {
  if (posts?.length === 0) return <div>هیچ پستی یافت نشد</div>

  return (
    <div className="grid grid-cols-3 gap-2">
      {posts?.map((post) => (
        <Fragment key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className="group relative col-span-1 flex h-44 items-center justify-center md:h-64 lg:h-80"
          >
            <Image
              src={post.image}
              fill
              alt="Post preview"
              className="-z-10 object-cover transition group-hover:blur-[2px] group-hover:brightness-90 group-hover:filter"
            />
            <div className="flex flex-col items-center justify-center space-x-6 opacity-0 transition group-hover:opacity-100">
              {post.likes.length > 0 && (
                <div className="flex items-center gap-1">
                  <HeartIcon className="fill-white text-white" />
                  <span className="text-white">{post.likes.length}</span>
                </div>
              )}

              {post._count.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="fill-white text-white" />
                  <span className="text-white">{post._count.comments}</span>
                </div>
              )}
            </div>
          </Link>
        </Fragment>
      ))}
    </div>
  )
}
export default PostsGrid
