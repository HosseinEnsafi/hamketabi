import { CommentWithExtras } from "@/lib/types"
import Link from "next/link"
import UserAvatar from "./UserAvatar"
import TimeAgo from "./TimeAgo"
import CommentOptions from "./CommentOptions"
import { User } from "next-auth"
import CommentActions from "./CommentActions"
import { cn } from "@/lib/utils"

const Comment = ({
  comment,
  user,
  className,
}: {
  comment: CommentWithExtras
  user: User
  className?: string
}) => {
  const href = `/profile/${comment.user.name}`

  if (!user.id) return null

  return (
    <article className={cn("flex w-full gap-3", className)}>
      <Link href={href} aria-label={`Visit ${comment.user.name}'s profile`}>
        <UserAvatar image={comment.user.image} />
      </Link>
      <div className="flex-1 space-y-1.5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={href}
              className="font-semibold text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Visit ${comment.user.name}'s profile`}
            >
              {comment.user.name}
            </Link>
            <p className="text-sm">{comment.body}</p>
          </div>
          <div className="flex items-center gap-2">
            <CommentActions comment={comment} userId={user.id} />
            {user?.id && <CommentOptions comment={comment} userId={user.id} />}
          </div>
        </header>
        <footer className="flex h-5 items-center space-x-2.5">
          <TimeAgo date={comment.createdAt} />
        </footer>
      </div>
    </article>
  )
}

export default Comment
