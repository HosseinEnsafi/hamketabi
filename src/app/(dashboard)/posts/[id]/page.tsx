import SinglePost from "@/components/SinglePost"
import { fetchPostById } from "@/data/post"
import { notFound } from "next/navigation"

interface PostPageProps {
  params: Promise<{ id: string }>
}

const PostPage = async ({ params }: PostPageProps) => {
  const id = (await params).id
  const post = await fetchPostById(id)
  
  if (!post) notFound()

  return (
    <>
      <SinglePost post={post} />
    </>
  )
}
export default PostPage
