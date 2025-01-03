import { PostWithExtras } from "@/lib/types"
import UserAvatar from "./UserAvatar"
import { auth } from "@/auth"
import Time from "@/components/Time"
import { Button } from "./ui/button"
import { ClockIcon } from "lucide-react"
import Image from "next/image"
import SingleFeedActions from "./SingleFeedAction"
import CommentForm from "./CommentForm"
import Comment from "./Comment"

interface SinglePostProps {
  post: PostWithExtras
}

const SinglePost = async ({ post }: SinglePostProps) => {
  const session = await auth()
  const postUsername = post?.user.name

  if (!session) return null

  return (
    <article className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <UserAvatar image={post.user.image} />
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{postUsername}</p>
              <p className="font-light text-muted-foreground">پست منشر کرد</p>
            </div>
            <div className="flex gap-4">
              <Time date={post.createdAt} />
              <p className="flex items-baseline gap-1 text-sm text-muted-foreground">
                <ClockIcon className="size-3 text-muted-foreground" />
                <span> {Math.abs(Math.ceil(post.body.length / 1000))} دقیقه</span>
              </p>
            </div>
          </div>
        </div>

        <Button className="bg-blue-600 p-0.5 px-6 text-xs text-white hover:bg-blue-600/80">دنبال کردن</Button>
      </div>

      <h2 className="!mt-6">{post.title}</h2>

      <div className="w-full overflow-hidden rounded-sm">
        <Image
          className="aspect-video rounded-sm bg-center object-cover object-center"
          width={1600}
          height={900}
          src={post.image}
          alt={post.title}
        />
      </div>

      <p className="!mt-2">{post.body}</p>

      <SingleFeedActions type="POST" feed={post} userId={session.user.id!} />

      <CommentForm commentAbleType="POST" className="!mt-8" commentAbleId={post.id} />

      <hr className="!mt-2" />

      {post.comments.length > 0 && (
        <ul className="!mt-2 flex flex-col gap-4">
          {post.comments.map((comment) => (
            <Comment user={session.user} comment={comment} key={comment.id} />
          ))}
        </ul>
      )}
    </article>
  )
}
export default SinglePost
