import { SingleReviewWithExtras } from "@/lib/types"
import Link from "next/link"
import UserAvatar from "./UserAvatar"
import Time from "./Time"
import BookPreview from "./BookPreview"
import Rating from "./Rating"
import BookOptions from "./BookOptions"
import ReviewActions from "./ReviewActions"
import { getUserId } from "@/data/auth"
import Comment from "./Comment"
import CommentForm from "./CommentForm"

interface Props {
  review: SingleReviewWithExtras
}
const SingleReview = async ({ review }: Props) => {
  const href = `/profile/${review.user.name}`
  const userId = await getUserId()
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
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
          <Time className="text-sm text-muted-foreground/80" date={review.createdAt} />
        </div>
      </div>

      <div className="flex justify-between">
        <BookPreview book={review.book} />
        <BookOptions book={review.book} />
      </div>

      <Rating className="mt-4 justify-end" rating={review.rating} />

      <p className="mt-8">{review.body}</p>

      <ReviewActions className="my-2" review={review} userId={userId} />

      <CommentForm commentAbleType="REVIEW" commentAbleId={review.id} />

      <hr />

      {review.comments.length > 0 && (
        <ul className="mt-2">
          {review.comments.map((comment) => (
            <Comment user={review.user} key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </div>
  )
}
export default SingleReview
