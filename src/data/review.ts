import { db } from "@/lib/db"
import { ReviewFeedItem, SingleReviewWithExtras } from "@/lib/types"

export const fetchReviewById = async (id: string): Promise<SingleReviewWithExtras | null> => {
  const selectSafeUser = { id: true, name: true, email: true, image: true }

  try {
    const review = await db.review.findUnique({
      where: { id },
      include: {
        user: { select: { ...selectSafeUser } },
        book: {
          include: {
            reviews: true,
            authors: {
              include: {
                author: true,
              },
            },
            publishers: {
              include: {
                publisher: true,
              },
            },
            category: true,
          },
        },
        likes: {
          include: {
            user: { select: { ...selectSafeUser } },
          },
        },
        comments: {
          include: {
            user: { select: { ...selectSafeUser } },
            likes: true,
          },
        },
        savedBy: {
          include: {
            user: { select: { ...selectSafeUser } },
          },
        },
      },
    })

    return review
  } catch (error) {
    return null
  }
}

export const fetchFeedReviews: () => Promise<ReviewFeedItem[]> = async () => {
  const reviews = await db.review.findMany({
    where: {
      body: { not: null },
    },
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
      book: {
        include: {
          reviews: true,
          authors: {
            include: {
              author: true,
            },
          },
          publishers: {
            include: {
              publisher: true,
            },
          },
          category: true,
        },
      },
    },
  })

  return reviews.map((review) => ({
    ...review,
    type: "REVIEW",
    body: review.body as string,
  }))
}
