import { cn } from "@/lib/utils"
import { Author, BookAuthor } from "@prisma/client"

interface BookAuthorsProps {
  authors: (BookAuthor & { author: Author })[]
  className?: string
}

const BookAuthors = ({ authors, className }: BookAuthorsProps) => {
  return (
    <div className={cn(className)}>
      {authors.map((author) => (
        <p className="text-sm text-muted-foreground sm:text-base" key={author.id}>
          {author.author.name}
        </p>
      ))}
    </div>
  )
}
export default BookAuthors
