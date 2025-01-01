import { ReviewWithExtras } from "@/lib/types"
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import TimeAgo from "./TimeAgo"

interface Props {
  review: ReviewWithExtras
}
const Review = ({ review }: Props) => {
  return (
    <article key={review.userId} className={cn("flex w-full gap-3")}>
      <Link href={`/profile/${review.user.name}`} aria-label={`Visit ${review.user.name}'s profile`}>
        <UserAvatar image={review.user.image} />
      </Link>
      <div className="flex-1 space-y-1.5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${review.user.name}`}
              className="font-semibold text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Visit ${review.user.name}'s profile`}
            >
              {review.user.name}
            </Link>
            <p className="text-sm">{review.body}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* <ReviewActions review={review} userId={user.id} /> */}
            {/* {user?.id && <ReviewOptions review={review} userId={user.id} />} */}
          </div>
        </header>
        <footer className="flex h-5 items-center space-x-2.5">
          <TimeAgo date={review.createdAt} />
        </footer>
      </div>
    </article>
  )
}
export default Review
