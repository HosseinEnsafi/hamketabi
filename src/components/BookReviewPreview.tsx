import { ReviewWithExtras } from "@/lib/types"
import { StarIcon } from "lucide-react"

interface Props {
  reviews: ReviewWithExtras[]
}

const BookReviewPreview = ({ reviews }: Props) => {
  const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
  const numOfReviewers = reviews.reduce((acc, curr) => (curr.body ? acc + 1 : acc), 0)

  return (
    <div className="flex gap-1 divide-x text-sm rtl:divide-x-reverse">
      <div className="flex items-baseline gap-0.5 pe-1">
        <span>{averageRating}</span>
        <StarIcon className="size-2 fill-yellow-500 text-yellow-500" />
      </div>
      <span className="px-1">{reviews.length} نفر</span>
      <span className="ps-1">{numOfReviewers > 0 ? `${numOfReviewers} یادداشت` : "بدون یادداشت"} </span>
    </div>
  )
}

export default BookReviewPreview
