import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface Props {
  rating: number
  className?: string
}

const Rating = ({ rating, className }: Props) => {
  return (
    <div dir="ltr" className={cn("flex w-full gap-1", className)}>
      {Array(5)
        .fill(0)
        .map((_, index: number) => {
          const starValue = index + 1
          const filled = starValue <= (rating ?? 0)

          return (
            <div key={index} className="relative cursor-pointer">
              <Star
                className={cn("size-5 text-yellow-500", {
                  "fill-yellow-500 text-yellow-500": filled,
                })}
              />
            </div>
          )
        })}
    </div>
  )
}
export default Rating
