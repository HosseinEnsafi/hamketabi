import { CommentWithExtras } from "@/lib/types"
import Link from "next/link"
import UserAvatar from "./UserAvatar"
import TimeAgo from "./TimeAgo"
import CommentOptions from "./CommentOptions"
import { User } from "next-auth"
import CommentActions from "./CommentActions"
import { cn } from "@/lib/utils"
import Time from "./Time"

const Comment = ({ comment, user, className }: { comment: CommentWithExtras; user: User; className?: string }) => {
  const href = `/profile/${comment.user.name}`

  if (!user.id) return null

  return (
    <article className={cn("flex w-full flex-col space-y-4", className)}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={href} aria-label={`Visit ${comment.user.name}'s profile`}>
            <UserAvatar image={comment.user.image} />
          </Link>
          <div className="flex flex-col">
            <Link
              href={href}
              className="text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Visit ${comment.user.name}'s profile`}
            >
              {comment.user.name}
            </Link>
            <Time className="text-sm" date={comment.createdAt} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user?.id && <CommentOptions comment={comment} userId={user.id} />}
        </div>
      </header>

      <p>{comment.body}</p>

      <CommentActions className="!mt-2" comment={comment} userId={user.id} />
    </article>
  )
}

export default Comment
