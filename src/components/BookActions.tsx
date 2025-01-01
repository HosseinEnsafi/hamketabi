import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface BookActionsProps {
  bookId: string
  hasReview: boolean
}

const BookActions = ({ bookId, hasReview }: BookActionsProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-4 flex w-2/3 min-w-20 gap-0.5">
        <Button className="flex-1 rounded-l-none text-white">خواهم خواند</Button>
        <span className="flex basis-8 cursor-pointer items-center justify-center rounded-l-md bg-primary text-white hover:bg-primary/90">
          <ChevronDown className="size-5" />
        </span>
      </div>
      <Button asChild className="mt-4 w-2/3 text-white">
        <Link href={`/reviews/create/${bookId}`}>{hasReview ? "ویرایش یادداشت" : "نوشتن یادداشت "}</Link>
      </Button>
    </div>
  )
}

export default BookActions
