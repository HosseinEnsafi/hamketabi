import { Review } from "@prisma/client"
import { StarIcon } from "lucide-react"

interface Props {
  reviews: Review[]
  showReviewers?: boolean
}
const RatingLabel = ({ reviews, showReviewers = false }: Props) => {
  const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="flex items-baseline gap-1.5">
      <div className="flex items-baseline gap-0.5">
        <span>{averageRating}</span>
        <StarIcon className="size-2.5 fill-yellow-500 text-yellow-500" />
      </div>
      {showReviewers && <span>{reviews.length} نفر</span>}
    </div>
  )
}
export default RatingLabel
