import CreateReviewForm from "@/components/CreateReviewForm"
import { getUserId } from "@/data/auth"
import { fetchBookById } from "@/data/book"
import { notFound } from "next/navigation"

interface CreateRatingPageProps {
  params: Promise<{ id: string }>
}

export default async function CreateRatingPage({ params }: CreateRatingPageProps) {
  const id = (await params).id
  const book = await fetchBookById(id)
  const userId = await getUserId()

  if (!book) notFound()

  return <CreateReviewForm book={book} userId={userId} />
}
