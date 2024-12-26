"use server"

import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import { ToggleLikeSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { LikeableType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const createLike = async (values: z.infer<typeof ToggleLikeSchema>) => {
  const pathMap: Record<LikeableType, (likeableId: string) => string[]> = {
    POST: (likeableId) => [`/feeds`, `/posts/${likeableId}`],
    QUOTE: (likeableId) => [`/feeds`, `/quotes/${likeableId}`],
    BOOKLIST: (likeableId) => [`/feeds`, `/booklists/${likeableId}`],
    COMMENT: (likeableId) => [`/posts`],
  }

  const fieldMap: Record<LikeableType, string> = {
    POST: "postId",
    QUOTE: "quoteId",
    BOOKLIST: "bookListId",
    COMMENT: "commentId",
  }

  let pathsToRevalidate: string[] = []

  try {
    const { likeableId, likeableType } = validateWithZodSchema(ToggleLikeSchema, values)
    const userId = await getUserId()

    const fieldKey = fieldMap[likeableType]

    pathsToRevalidate = pathMap[likeableType](likeableId)

    const like = await db.like.findFirst({ where: { userId, [fieldKey]: likeableId } })

    if (like) await db.like.delete({ where: { id: like.id } })
    else await db.like.create({ data: { likeableType, userId, [fieldKey]: likeableId } })
  } catch (error) {
    return renderError(error)
  } finally {
    pathsToRevalidate.forEach((path) => revalidatePath(path))
  }
}
