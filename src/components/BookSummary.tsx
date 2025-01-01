import { cn } from "@/lib/utils"
import { Author, BookAuthor, BookPublisher, Publisher } from "@prisma/client"

interface Props {
  numbOfPages: number
  authors: (BookAuthor & { author: Author })[]
  publishers: (BookPublisher & { publisher: Publisher })[]
  isbn: string
  className?: string
}

const BookSummary = (props: Props) => {
  const { numbOfPages, authors, publishers, isbn, className } = props

  return (
    <ul
      className={cn(
        "flex w-full list-none flex-col items-center justify-between space-y-4 py-4 sm:flex-row sm:space-y-0 sm:divide-x-2 sm:divide-y-0 rtl:sm:divide-x-reverse",
        className,
      )}
    >
      <li className="flex flex-1 flex-col items-center justify-center gap-0.5 px-4">
        <span className="text-sm">تعداد صفحات</span>
        <span className="">{numbOfPages}</span>
      </li>

      <li className="flex flex-1 flex-col items-center justify-center gap-0.5 px-4">
        <span className="text-sm">پدیدآورنده</span>
        <div className="flex flex-wrap justify-center gap-1">
          {authors.map(({ author }) => (
            <span key={author.id} className="">
              {author.name}
            </span>
          ))}
        </div>
      </li>

      <li className="flex flex-1 flex-col items-center justify-center gap-0.5 px-4">
        <span className="text-sm">انتشارات</span>
        <div className="flex flex-wrap justify-center gap-1">
          {publishers.map(({ publisher }) => (
            <span key={publisher.id} className="">
              {publisher.name}
            </span>
          ))}
        </div>
      </li>

      <li className="flex flex-1 flex-col items-center justify-center gap-0.5 px-4 text-sm">
        <span>شابک</span>
        <span>{isbn}</span>
      </li>
    </ul>
  )
}

export default BookSummary
