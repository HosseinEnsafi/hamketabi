import { cn } from "@/lib/utils"
import { Author, BookAuthor, BookPublisher, Publisher } from "@prisma/client"

interface Props {
  numbOfPages: number
  authors: (BookAuthor & { author: Author })[]
  publishers: (BookPublisher & { publisher: Publisher })[]
  className?: string
}

const BookSummary = (props: Props) => {
  const { numbOfPages, authors, publishers, className } = props

  return (
    <ul
      className={cn(
        "flex h-0 w-full list-none items-center justify-between divide-x-2 py-4 rtl:divide-x-reverse",
        className,
      )}
    >
      <li className="flex flex-1 flex-col items-center justify-center px-4">
        <span className="text-sm">تعداد صفحات</span>
        <span className="">{numbOfPages}</span>
      </li>

      <li className="flex flex-1 flex-col items-center justify-center px-4">
        <span className="text-sm">پدیدآورنده</span>
        <div className="flex flex-wrap justify-center gap-1">
          {authors.map(({ author }) => (
            <span key={author.id} className="">
              {author.name}
            </span>
          ))}
        </div>
      </li>

      <li className="flex flex-1 flex-col items-center justify-center px-4">
        <span className="text-sm">انتشارات</span>
        <div className="flex flex-wrap justify-center gap-1">
          {publishers.map(({ publisher }) => (
            <span key={publisher.id} className="">
              {publisher.name}
            </span>
          ))}
        </div>
      </li>
    </ul>
  )
}

export default BookSummary
