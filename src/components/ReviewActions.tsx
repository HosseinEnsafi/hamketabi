import { ReviewWithExtras } from "@/lib/types"
import LikeButton from "./LikeButton"
import { cn } from "@/lib/utils"
import BookMarkButton from "./BookmarkButton"
import CommentButton from "./CommentButton"
import ShareFeedItemButton from "./ShareFeedItemButton"

interface Props {
  review: ReviewWithExtras
  userId: string
  className?: string
}
const ReviewActions = ({ review, className, userId }: Props) => {
  return (
    <div className={cn("flex w-full items-center justify-between gap-2 rtl:flex-row-reverse", className)}>
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <LikeButton likeableType="REVIEW" likeableId={review.id} likes={review.likes} userId={userId} />
        <CommentButton commentsCount={review.comments.length} feedId={review.id} feedType="REVIEW" />
        <ShareFeedItemButton feedId={review.id} feedType="REVIEW" />
      </div>
      <BookMarkButton saveableId={review.id} saveableType="REVIEW" savedBy={review.savedBy} userId={userId} />
    </div>
  )
}
export default ReviewActions
