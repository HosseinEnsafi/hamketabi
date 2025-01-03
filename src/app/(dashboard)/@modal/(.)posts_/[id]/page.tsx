// import PostView from "@/components/PostView"
// import { fetchPostById } from "@/data/post"
import { notFound } from "next/navigation"
import React from "react"
interface PostModalProps {
  params: Promise<{ id: string }>
}

const PostModal = async ({ params }: PostModalProps) => {
  const id = (await params).id
  // const post = await fetchPostById(id)

  // if (!post) notFound()

  return (
    <>
      {null}
      {/* <PostView post={post} /> */}
    </>
  )
}
export default PostModal
