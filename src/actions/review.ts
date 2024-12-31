"use server"
import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import { CreateReview, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const createReview = async (values: z.infer<typeof CreateReview>) => {
  const pathsToRevalidate = [`/books/${values.bookId}`, `/reviews/create/${values.bookId}`]
  try {
    const { body, rating, bookId } = validateWithZodSchema(CreateReview, values)
    const userId = await getUserId()
    const review = await db.review.findUnique({ where: { userId_bookId: { userId, bookId } } })

    if (review) return { error: "از قبل یادداشت گذاشته اید" }

    await db.review.create({
      data: {
        body,
        rating: parseInt(rating),
        user: { connect: { id: userId } },
        book: { connect: { id: bookId } },
      },
    })
  } catch (error) {
    return renderError(error)
  } finally {
    pathsToRevalidate.forEach((path) => revalidatePath(path))
  }
}
