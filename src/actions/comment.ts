"use server"

import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import { CreateCommentSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { CommentAbleType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const createComment = async (values: z.infer<typeof CreateCommentSchema>) => {
  const pathMap: Record<CommentAbleType, (commentAbleId: string) => string> = {
    POST: (commentAbleId) => `/posts/${commentAbleId}`,
    QUOTE: (commentAbleId) => `/quotes/${commentAbleId}`,
    BOOKLIST: (commentAbleId) => `/booklists/${commentAbleId}`,
    REVIEW: (commentAbleId) => `/reviews/${commentAbleId}`,
  }

  const fieldMap: Record<CommentAbleType, string> = {
    POST: "postId",
    QUOTE: "quoteId",
    BOOKLIST: "bookListId",
    REVIEW: "reviewId",
  }

  try {
    const { body, commentAbleId, commentAbleType } = validateWithZodSchema(CreateCommentSchema, values)
    const userId = await getUserId()

    const fieldKey = fieldMap[commentAbleType]

    const comment = await db.comment.findFirst({
      where: {
        userId,
        [fieldKey]: commentAbleId,
      },
    })

    if (comment) throw new Error("شما از قبل نظر گذاشته اید")

    await db.comment.create({
      data: {
        userId,
        body,
        commentAbleType,
        [fieldKey]: commentAbleId,
      },
    })
  } catch (error) {
    return renderError(error)
  } finally {
    if (!CreateCommentSchema.safeParse(values).success) return { error: "مقادیر نامعتبر" }
    const pathToRevalidate = pathMap[values.commentAbleType](values.commentAbleId)
    revalidatePath(pathToRevalidate)
  }
}
