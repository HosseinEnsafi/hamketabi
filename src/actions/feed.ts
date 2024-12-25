"use server"
import { renderError } from "@/lib/utils"
import { FeedSchema, validateWithZodSchema } from "@/lib/schemas"
import { deletePost, likePost, savePost } from "./post"
import { z } from "zod"
import { revalidatePath } from "next/cache"

export const deleteFeedItem = async (values: z.infer<typeof FeedSchema>) => {
  try {
    const { type, feedId } = validateWithZodSchema(FeedSchema, values)

    if (type === "POST") await deletePost({ id: feedId })
    // else if (type === "QUOTE") await deleteQuote({ id: feedId })
    // else if (type === "BOOKLIST") await deleteBooklist({ id: feedId })
    else throw new Error("نوع فید را به درستی وارد کنید")

    revalidatePath("/feeds")
    return { success: "با موفقیت حذف شد" }
  } catch (error) {
    return renderError(error)
  }
}

export const likeFeedItem = async (values: z.infer<typeof FeedSchema>) => {
  try {
    const { type, feedId } = validateWithZodSchema(FeedSchema, values)
    if (type === "POST") await likePost({ feedId })
  } catch (error) {
    return renderError(error)
  } finally {
    revalidatePath("/feeds")
  }
}

export const saveFeedItem = async (values: z.infer<typeof FeedSchema>) => {
  try {
    const { type, feedId } = validateWithZodSchema(FeedSchema, values)
    if (type === "POST") await savePost({ feedId })
  } catch (error) {
    return renderError(error)
  } finally {
    revalidatePath("/feeds")
  }
}
