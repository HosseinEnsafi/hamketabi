"use server"

import { getUserId } from "@/data/auth"
import { db } from "@/lib/db"
import {
  CreatePostSchema,
  DeletePostSchema,
  LikeSchema,
  BookmarkSchema,
  validateWithZodSchema,
  CreateCommentSchema,
} from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { revalidatePath } from "next/cache"
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
        userId,
      },
    })

    redirect("/feeds")
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

export const likePost = async (values: z.infer<typeof LikeSchema>) => {
  try {
    const { feedId: postId } = validateWithZodSchema(LikeSchema, values)
    const userId = await getUserId()

    const userId_postId = { userId, postId }

    const like = await db.like.findUnique({
      where: { userId_postId },
    })

    if (like) {
      await db.like.delete({ where: { userId_postId } })
    } else {
      await db.like.create({
        data: {
          postId,
          userId,
          likeableType: "POST",
        },
      })
    }
  } catch (error) {
    throw error
  }
}

export const savePost = async (values: z.infer<typeof BookmarkSchema>) => {
  try {
    const { feedId: postId } = validateWithZodSchema(BookmarkSchema, values)
    const userId = await getUserId()
    const userId_postId = { userId, postId }

    const saved = await db.saved.findUnique({
      where: { userId_postId },
    })

    if (saved) {
      await db.saved.delete({ where: { userId_postId } })
    } else {
      await db.saved.create({
        data: {
          postId,
          userId,
          saveableType: "POST",
        },
      })
    }
  } catch (error) {
    throw error
  }
}

export const commentPost = async (values: z.infer<typeof CreateCommentSchema>) => {
  try {
    const userId = await getUserId()
    const { body, feedId: postId } = validateWithZodSchema(CreateCommentSchema, values)

    const [post, comment] = await Promise.all([
      db.post.findUnique({ where: { id: postId } }),
      db.comment.findFirst({ where: { userId, postId } }),
    ])

    if (!post) throw new Error("پست پیدا نشد")
    if (comment) throw new Error("از قبل نظر گذاشته اید")

    await db.comment.create({
      data: {
        commentAbleType: "POST",
        postId,
        userId,
        body,
      },
    })
  } catch (error) {
    return renderError(error)
  }
}
