import { ReviewWithExtras } from "@/lib/types"
import RatingLabel from "./RatingLabel"
import ReviewLabel from "./ReviewLabel"

interface Props {
  reviews: ReviewWithExtras[]
}

const BookReviewPreview = ({ reviews }: Props) => {
  return (
    <div className="flex gap-1 divide-x text-sm rtl:divide-x-reverse">
      <RatingLabel showReviewers={true} reviews={reviews} />
      <ReviewLabel reviews={reviews} />
    </div>
  )
}

export default BookReviewPreview
