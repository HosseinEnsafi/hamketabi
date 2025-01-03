"use server"

import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import { ToggleSavedSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { SaveableType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const toggleSaved = async (values: z.infer<typeof ToggleSavedSchema>) => {
  const pathMap: Record<SaveableType, (saveableId: string) => string[]> = {
    POST: (saveableId) => [`/feeds`, `/posts/${saveableId}`],
    QUOTE: (saveableId) => [`/feeds`, `/quotes/${saveableId}`],
    BOOKLIST: (saveableId) => [`/feeds`, `/booklists/${saveableId}`],
    REVIEW: (saveableId) => [`/feeds`, `/reviews/${saveableId}`],
    BOOK: (saveableId) => [`/feeds`, `/books/${saveableId}`],
  }

  const fieldMap: Record<SaveableType, string> = {
    POST: "postId",
    QUOTE: "quoteId",
    BOOKLIST: "bookListId",
    REVIEW: "reviewId",
    BOOK: "bookId",
  }

  let pathsToRevalidate: string[] = []

  try {
    const { saveableId, saveableType } = validateWithZodSchema(ToggleSavedSchema, values)
    const userId = await getUserId()

    const fieldKey = fieldMap[saveableType]

    pathsToRevalidate = pathMap[saveableType](saveableId)

    const saved = await db.saved.findFirst({
      where: { userId, [fieldKey]: saveableId },
    })

    if (saved) {
      await db.saved.delete({ where: { id: saved.id } })
    } else {
      await db.saved.create({
        data: { saveableType, userId, [fieldKey]: saveableId },
      })
    }
  } catch (error) {
    return renderError(error)
  } finally {
    pathsToRevalidate.forEach((path) => revalidatePath(path))
  }
}
