import SingleBook from "@/components/SingleBook"
import { getUserId } from "@/data/auth"
import { fetchBookById } from "@/data/book"
import { notFound } from "next/navigation"

interface BookDetailPageProps {
  params: Promise<{ id: string }>
}

const BookDetailPage = async ({ params }: BookDetailPageProps) => {
  const id = (await params).id
  const book = await fetchBookById(id)
  if (!book) notFound()

  const userId = await getUserId()

  return <SingleBook userId={userId} book={book} />
}
export default BookDetailPage
