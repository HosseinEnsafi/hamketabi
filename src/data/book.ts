import { db } from "@/lib/db"
import { BookWithExtras } from "@/lib/types"

export const fetchBookById = async (id: string): Promise<BookWithExtras | null> => {
  const selectSafeUser = { id: true, name: true, email: true, image: true }

  try {
    const book = await db.book.findUnique({
      where: { id },
      include: {
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
        reviews: {
          include: {
            user: { select: { ...selectSafeUser } },
            book: {
              include: {
                authors: true,
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
        },
        category: true,
        bookList: true,
      },
    })

    return book
  } catch (error) {
    return null
  }
}
