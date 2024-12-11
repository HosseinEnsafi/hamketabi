import { auth } from "@/auth"

export const getUserId = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw new Error("برای استفاده از این بخش ثبت نام کنید")
  }

  return userId
}
