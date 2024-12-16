"use server"
import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import { CreatePostSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { redirect } from "next/navigation"
import { z } from "zod"

export const createPost = async (values: z.infer<typeof CreatePostSchema>) => {
  try {
    const { body, image, title } = validateWithZodSchema(CreatePostSchema, values)
    const userId = await getUserId()
    await db.post.create({
      data: {
        title,
        image,
        body,
        user: { connect: { id: userId } },
      },
    })

    redirect("/feeds")
  } catch (error) {
    console.log(error)
    return renderError(error)
  }
}
