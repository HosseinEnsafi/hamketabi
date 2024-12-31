import { db } from "@/lib/db"
import { PostFeedItem, PostWithExtras } from "@/lib/types"

export const fetchFeedsPosts = async (): Promise<PostFeedItem[]> => {
  const posts = await db.post.findMany({
    include: {
      _count: { select: { comments: true } },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      likes: true,
      savedBy: true,
    },
  })
  return posts.map(({ ...post }) => ({
    ...post,
    type: "POST",
  }))
}

export const fetchPostById = async (postId: string): Promise<PostWithExtras | null> => {
  const selectSafeUser = { id: true, name: true, email: true, image: true }

  try {
    const post = await db.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            phoneNumber: true,
            phoneVerified: true,
            role: true,
          },
        },
        likes: {
          where: { postId },
          include: {
            user: { select: { ...selectSafeUser } },
          },
        },
        savedBy: {
          where: { postId },
          include: {
            user: { select: { ...selectSafeUser } },
          },
        },
        comments: {
          where: { postId },
          include: {
            user: { select: { ...selectSafeUser } },
            likes: true,
          },
        },
      },
    })

    return post
  } catch (error) {
    return null
  }
}
