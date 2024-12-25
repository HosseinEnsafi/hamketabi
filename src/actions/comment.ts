"use server"
import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import { CreateCommentSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { CommentAbleType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const CreateComment = async (
  values: z.infer<typeof CreateCommentSchema>,
  commentAbleType: CommentAbleType,
) => {
  let pathToRevalidate = ""
  try {
    const { body, feedId } = validateWithZodSchema(CreateCommentSchema, values)
    const userId = await getUserId()

    let comment
    switch (commentAbleType) {
      case "POST":
        comment = await db.comment.findFirst({ where: { postId: feedId } })
        pathToRevalidate = `/posts/${feedId}`
        break
      case "QUOTE":
        comment = await db.comment.findFirst({ where: { quoteId: feedId } })
        pathToRevalidate = `/quotes/${feedId}`
        break
      case "BOOKLIST":
        comment = await db.comment.findFirst({ where: { bookListId: feedId } })
        pathToRevalidate = `/booklists/${feedId}`
        break
      default:
        throw new Error("نوع کامنت نامعتبر است")
    }

    if (comment) throw new Error("شما از قبل نظر داده اید")

    await db.comment.create({
      data: {
        userId,
        body,
        commentAbleType,
        postId: commentAbleType === "POST" ? feedId : null,
        quoteId: commentAbleType === "QUOTE" ? feedId : null,
        bookListId: commentAbleType === "BOOKLIST" ? feedId : null,
      },
    })
  } catch (error) {
    return renderError(error)
  } finally {
    revalidatePath(pathToRevalidate)
  }
}
