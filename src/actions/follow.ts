"use server"
import { getUserId } from "@/data/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { FollowUserSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function followUser(values: z.infer<typeof FollowUserSchema>) {
  let user

  try {
    const userId = await getUserId()
    user = await getUserById(userId)

    if (!user) throw new Error("کاربر یافت نشد")

    const { id } = validateWithZodSchema(FollowUserSchema, values)

    const followerId_followingId = { followerId: userId, followingId: id }

    const follows = await db.follows.findUnique({ where: { followerId_followingId } })

    if (follows) await db.follows.delete({ where: { followerId_followingId } })
    else await db.follows.create({ data: { followerId: userId, followingId: id } })
  } catch (error) {
    return renderError(error)
  } finally {
    if (user) revalidatePath(`/profile/${user.name}`)
  }
}
