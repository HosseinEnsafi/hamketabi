import { ReviewWithExtras } from "@/lib/types"
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import TimeAgo from "./TimeAgo"
import ReviewOptions from "./ReviewOptions"
import ReviewActions from "./ReviewActions"
import Rating from "./Rating"

interface Props {
  review: ReviewWithExtras
  userId: string
}

const Review = ({ review, userId }: Props) => {
  const href = `/profile/${review.user.name}`

  return (
    <article className={cn("flex w-full flex-col space-y-4")}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={href} aria-label={`Visit ${review.user.name}'s profile`}>
            <UserAvatar image={review.user.image} />
          </Link>

          <div className="flex flex-col">
            <Link
              href={href}
              className="text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Visit ${review.user.name}'s profile`}
            >
              {review.user.name}
            </Link>
            <TimeAgo className="text-sm" date={review.createdAt} />
          </div>
        </div>
        <ReviewOptions review={review} userId={review.user.id} />
      </header>

      <Link className="!mt-2 self-start" href={`/reviews/${review.id}`}>
        <Rating className="my-3" rating={review.rating} />
      </Link>

      <Link className="!mt-2" href={`/reviews/${review.id}`}>
        <p>{review.body}</p>
      </Link>

      <div className="!mt-3 flex items-center justify-end gap-2">
        <ReviewActions review={review} userId={userId} />
      </div>
    </article>
  )
}

export default Review
