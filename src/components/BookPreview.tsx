"use client"
import BookCover from "./BookCover"
import BookAuthors from "./BookAuthors"
import ReviewLabel from "./ReviewLabel"
import RatingLabel from "./RatingLabel"
import Link from "next/link"
import { BookPreview as BookPreviewType } from "@/lib/types"

interface BookPreviewProps {
  book: BookPreviewType
}

const BookPreview = ({ book }: BookPreviewProps) => {
  const toBook = `/books/${book.id}`
  return (
    <div className="flex items-center justify-between gap-4">
      <Link href={toBook}>
        <BookCover className="h-24 w-16" src={book.cover || ""} alt="کاور کتاب" />
      </Link>
      <div className="flex flex-1 flex-col justify-between self-stretch">
        <Link href={toBook}>
          <h2 className="mb-3">{book.title}</h2>
        </Link>
        <BookAuthors authors={book.authors} />
        <div className="flex items-center gap-2 text-sm">
          <RatingLabel reviews={book.reviews} />
          <ReviewLabel icon={true} reviews={book.reviews} />
        </div>
      </div>
    </div>
  )
}

export default BookPreview
