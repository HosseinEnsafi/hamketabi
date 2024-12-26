import { CommentWithExtras } from "@/lib/types"
import Link from "next/link"
import UserAvatar from "./UserAvatar"
import TimeAgo from "./TimeAgo"
import CommentOptions from "./CommentOptions"
import { User } from "next-auth"
import CommentActions from "./CommentActions"

const Comment = ({ comment, user }: { comment: CommentWithExtras; user: User }) => {
  const href = `/profile/${comment.user.name}`

  if (!user.id) return

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-3">
        <Link href={href}>
          <UserAvatar image={comment.user.image} />
        </Link>
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-sm leading-none">
            <div className="flex gap-2">
              <Link href={href} className="font-semibold text-muted-foreground">
                {comment.user.name}
              </Link>
              <p className="">{comment.body}</p>
            </div>
            {user?.id && <CommentOptions comment={comment} userId={user.id} />}
          </div>
          <div className="flex h-5 items-center space-x-2.5">
            <TimeAgo date={comment.createdAt} />
          </div>
        </div>
      </div>
      <CommentActions comment={comment} userId={user.id} />
    </div>
  )
}

export default Comment
