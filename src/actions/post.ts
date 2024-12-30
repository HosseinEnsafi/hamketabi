"use server"

import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import { CreatePostSchema, DeletePostSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export const createPost = async (values: z.infer<typeof CreatePostSchema>) => {
  try {
    const { body, image, title } = validateWithZodSchema(CreatePostSchema, values)
    const userId = await getUserId()
    const { id } = await db.post.create({
      data: {
        title,
        image,
        body,
        userId,
      },
    })

    redirect(`/posts/${id}`)
  } catch (error) {
    return renderError(error)
  }
}

export const deletePost = async (values: z.infer<typeof DeletePostSchema>) => {
  try {
    const { id } = validateWithZodSchema(DeletePostSchema, values)
    const userId = await getUserId()

    await db.post.delete({ where: { id, userId } })

    revalidatePath("/feeds")
    return { success: "پست با موفقیت حذف شد" }
  } catch (error) {
    return renderError(error)
  }
}
