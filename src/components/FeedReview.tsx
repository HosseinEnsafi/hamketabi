import { ReviewFeedItem } from "@/lib/types"
import FeedHeader from "./FeedHeader"
import FeedOptions from "./FeedOptions"
import BookPreview from "./BookPreview"
import BookOptions from "./BookOptions"
import Rating from "./Rating"
import ReviewActions from "./ReviewActions"
import FeedActions from "./FeedActions"
import Link from "next/link"

interface Props {
  review: ReviewFeedItem
  userId: string
}
const FeedReview = async ({ review, userId }: Props) => {
  return (
    <article className="flex w-full flex-col space-y-4 rounded bg-card px-3 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <FeedHeader
          date={review.createdAt}
          description="یادداشت منتشر کرد"
          user={review.user}
          timeFormat="relative"
          // TODO fix User schema in prisma to have name always in both oath and credentials
          username={review.user.name || "ناشناس"}
        />

        <FeedOptions userId={userId} feed={review} />
      </div>

      <BookPreview book={review.book} />

      <Link href={`reviews/${review.id}`}>
        <Rating className="mr-4 justify-end" rating={review.rating} />
      </Link>

      <Link href={`reviews/${review.id}`}>
        <p>{review.body}</p>
      </Link>

      <FeedActions feed={review} type="REVIEW" userId={userId} />
    </article>
  )
}
export default FeedReview
