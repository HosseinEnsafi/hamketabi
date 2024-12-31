import { BookWithExtras, ReviewWithExtras } from "@/lib/types"
import BookAuthors from "./BookAuthors"
import BookCover from "./BookCover"
import BookSummary from "./BookSummary"
import BookReviewPreview from "./BookReviewPreview"
import { Button } from "./ui/button"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import RateBook from "./RateBook"
import { getUserId } from "@/data/auth"

interface Props {
  book: BookWithExtras
}
const SingleBook = async ({ book }: Props) => {
  const userId = await getUserId()
  const predicate = (reviews: ReviewWithExtras[]) => reviews.some((review) => review.userId === userId)

  return (
    <article className="flex flex-col gap-8">
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <BookCover className="" src={book.cover || ""} alt="کاور کتاب" />
        <div className="flex w-2/3 flex-col gap-2 sm:self-start">
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="text-xl font-bold sm:text-2xl">{book.title}</h2>
            <BookAuthors authors={book.authors} />
            {book.reviews.length > 0 && <BookReviewPreview reviews={book.reviews} />}
            <div className="flex w-full flex-col items-center">
              <div className="mt-4 flex w-2/3 min-w-20 gap-0.5">
                <Button className="flex-1 rounded-l-none text-white">خواهم خواند</Button>
                <span className="flex basis-8 cursor-pointer items-center justify-center rounded-l-md bg-primary text-white hover:bg-primary/90">
                  <ChevronDown className="size-5" />
                </span>
              </div>
              <Button asChild className="mt-4 w-2/3 text-white">
                <Link href={`/reviews/create/${book.id}`}>
                  {predicate(book.reviews) ? "ویرایش یادداشت" : "نوشتن یادداشت "}
                </Link>
              </Button>
            </div>
            <RateBook userId={userId} book={book} className="!mt-4" />
          </div>
        </div>
      </div>
      <BookSummary authors={book.authors} numbOfPages={book.numOfPages} publishers={book.publishers} />
    </article>
  )
}
export default SingleBook
