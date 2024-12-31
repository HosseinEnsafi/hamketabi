interface CreateReviewPageProps {
  params: Promise<{ id: string }>
}

export default async function CreateReviewPage({ params }: CreateReviewPageProps) {
  const id = (await params).id
  return <div>{id}</div>
}
