import { db } from "@/lib/db"
import { getUserId } from "@/data/auth"
import { PostFeedItem } from "@/lib/types"

export const fetchFeedsPosts = async (): Promise<PostFeedItem[]> => {
  const userId = await getUserId()

  const posts = await db.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneVerified: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          phoneNumber: true,
        },
      },
      _count: { select: { likes: true, savedBy: true, comments: true } },
      likes: { where: { userId }, select: { id: true } },
      savedBy: { where: { userId }, select: { id: true } },
    },
  })

  return posts.map(({ likes, savedBy, ...post }) => ({
    ...post,
    type: "POST",
    hasLiked: likes.length > 0,
    hasSaved: savedBy.length > 0,
  }))
}
