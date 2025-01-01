import { ReviewWithExtras } from "@/lib/types"
import { NotebookPen } from "lucide-react"

interface Props {
  reviews: ReviewWithExtras[]
  icon?: boolean
}

const ReviewLabel = ({ reviews, icon = false }: Props) => {
  const numOfReviewers = reviews.filter((review) => review.body).length

  return (
    <div className="flex items-baseline gap-0.5">
      {numOfReviewers > 0 ? (
        <>
          <span>{numOfReviewers}</span>
          {icon && <NotebookPen className="size-2.5" />}
          {!icon && <p>یادداشت</p>}
        </>
      ) : (
        <p>بدون یادداشت</p>
      )}
    </div>
  )
}

export default ReviewLabel
