import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface Props {
  rating: number
  className?: string
}
const StarsRating = ({ rating, className }: Props) => {
  return (
    <div className="flex w-full justify-center gap-1">
      {Array(5)
        .fill(0)
        .map((_, index: number) => {
          const starValue = index + 1
          const isFilled = starValue <= rating

          return (
            <Star
              key={index}
              className={cn("size-8 text-yellow-500", {
                "fill-yellow-500 text-yellow-500": isFilled,
                className,
              })}
            />
          )
        })}
    </div>
  )
}
export default StarsRating
