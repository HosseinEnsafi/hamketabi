import { BookWithExtras, ReviewWithExtras } from "@/lib/types"
import BookAuthors from "./BookAuthors"
import BookCover from "./BookCover"
import BookSummary from "./BookSummary"
import BookReviewPreview from "./BookReviewPreview"
import RateBook from "./RateBook"
import BookActions from "./BookActions"
import Review from "./Review"

interface Props {
  book: BookWithExtras
  userId: string
}
const SingleBook = async ({ book, userId }: Props) => {
  const predicate = (review: ReviewWithExtras) => review.userId === userId
  const review = book.reviews.find(predicate)
  const hasReview = Boolean(review && review.body)

  return (
    <article className="flex flex-col space-y-8">
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <BookCover className="" src={book.cover || ""} alt="کاور کتاب" />
        <div className="flex w-2/3 flex-col gap-2 sm:self-start">
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="text-xl font-bold sm:text-2xl">{book.title}</h2>
            <BookAuthors authors={book.authors} />
            {book.reviews.length > 0 && <BookReviewPreview reviews={book.reviews} />}
            <BookActions bookId={book.id} hasReview={hasReview} />
            <RateBook bookId={book.id} userId={userId} reviews={book.reviews} className="!mt-4" />
          </div>
        </div>
      </div>
      <BookSummary
        isbn={book.isbn}
        authors={book.authors}
        numbOfPages={book.numOfPages}
        publishers={book.publishers}
      />

      <hr className="!mt-2" />

      {book.reviews.length > 0 && (
        <ul className="!mt-2 flex flex-col gap-4">
          {book.reviews
            .filter((review) => review.body)
            .map((review) => (
              <Review userId={userId} key={review.id} review={review} />
            ))}
        </ul>
      )}
    </article>
  )
}
export default SingleBook
