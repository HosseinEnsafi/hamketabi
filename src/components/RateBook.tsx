"use client"
import { useState, useTransition } from "react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { BookWithExtras } from "@/lib/types"
import { createReview } from "@/actions/review"
import { toast } from "sonner"
import { useOptimisticReviews } from "@/lib/hooks"
import { Button } from "./ui/button"

interface RateBookProps {
  book: BookWithExtras
  userId: string
  className?: string
  onRate?: (rating: number) => void
}

const RateBook = ({ className, onRate, book, userId }: RateBookProps) => {
  const [isPending, startTransition] = useTransition()
  const [hoverRating, setHoverRating] = useState(0)

  const { addOptimisticReviews, ratingNumber } = useOptimisticReviews(book.reviews, userId)

  const handleRate = async (index: number) => {
    if (isPending) return

    const selectedRating = index + 1
    startTransition(() => {
      addOptimisticReviews({ userId, rating: selectedRating })

      createReview({ body: "", bookId: book.id, rating: String(selectedRating) }).then((res) => {
        if (res && "error" in res) {
          toast.error(res.error)
          return
        }
      })
    })
    onRate?.(selectedRating)
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {!ratingNumber ? (
        <p className="text-center text-muted-foreground">با انتخاب ستاره به این کتاب امتیاز دهید</p>
      ) : (
        <Button variant={"link"} className="text-muted-foreground">
          ویرایش امتیاز
        </Button>
      )}

      <div dir="ltr" className="flex w-full justify-center gap-1">
        {Array(5)
          .fill(0)
          .map((_, index: number) => {
            const starValue = index + 1
            const isFilled = starValue <= (hoverRating || (ratingNumber ?? 0))

            return (
              <div
                key={index}
                className="relative cursor-pointer"
                onMouseEnter={() => setHoverRating(index + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRate(index)}
              >
                <Star
                  className={cn("size-8 text-yellow-500", {
                    "fill-yellow-500 text-yellow-500": isFilled,
                  })}
                />
              </div>
            )
          })}
      </div>

      {ratingNumber && <p className="text-center text-muted-foreground">امتیاز انتخابی: {ratingNumber}</p>}
    </div>
  )
}

export default RateBook
