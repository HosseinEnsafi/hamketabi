import SingleBook from "@/components/SingleBook"
import { fetchBookById } from "@/data/book"
import { notFound } from "next/navigation"

interface BookDetailPageProps {
  params: Promise<{ id: string }>
}

const BookDetailPage = async ({ params }: BookDetailPageProps) => {
  const id = (await params).id
  const book = await fetchBookById(id)
  if (!book) notFound()

  return <SingleBook book={book} />
}
export default BookDetailPage
