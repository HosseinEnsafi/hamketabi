import SingleReview from "@/components/SingleReview"
import { fetchReviewById } from "@/data/review"
import { notFound } from "next/navigation"

interface CreateRatingPageProps {
  params: Promise<{ id: string }>
}

export default async function CreateRatingPage({ params }: CreateRatingPageProps) {
  const id = (await params).id
  const review = await fetchReviewById(id)

  if (!review) notFound()

  return <SingleReview review={review} />
}
