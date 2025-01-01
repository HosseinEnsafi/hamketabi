"use server"
import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import { CreateRatingSchema, CreateReviewSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export const createRating = async (values: z.infer<typeof CreateRatingSchema>) => {
  const pathsToRevalidate = [`/books/${values.bookId}`, `/reviews/create/${values.bookId}`]
  try {
    const { rating, bookId } = validateWithZodSchema(CreateRatingSchema, values)
    const userId = await getUserId()

    await db.review.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: { rating: parseInt(rating) },
      create: {
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
export const createReview = async (values: z.infer<typeof CreateReviewSchema>) => {
  const pathsToRevalidate = [`/books/${values.bookId}`, `/reviews/create/${values.bookId}`]
  try {
    const { body, rating, bookId } = validateWithZodSchema(CreateReviewSchema, values)
    const userId = await getUserId()

    await db.review.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: { rating: parseInt(rating), body },
      create: {
        rating: parseInt(rating),
        body,
        user: { connect: { id: userId } },
        book: { connect: { id: bookId } },
      },
    })

    redirect(`/books/${bookId}`)
  } catch (error) {
    return renderError(error)
  } finally {
    pathsToRevalidate.forEach((path) => revalidatePath(path))
  }
}
