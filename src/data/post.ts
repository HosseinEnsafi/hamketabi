import { db } from "@/lib/db"
import { getUserId } from "@/data/auth"
import { PostFeedItem } from "@/lib/types"

export const fetchFeedsPosts = async (): Promise<PostFeedItem[]> => {
  const userId = await getUserId()

  const posts = await db.post.findMany({
    include: {
      _count: { select: { comments: true } },
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
      likes: { where: { userId } },
      savedBy: { where: { userId } },
    },
  })
  return posts.map(({ ...post }) => ({
    ...post,
    type: "POST",
  }))
}
