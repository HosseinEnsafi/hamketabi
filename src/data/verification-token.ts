import { db } from "@/lib/db"

export const getVerificationToken = async (phoneNumber: string, token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        phoneNumber_token: {
          phoneNumber,
          token,
        },
      },
    })
    return verificationToken
  } catch {
    return null
  }
}
export const getVerificationTokenByPhoneNumber = async (phoneNumber: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        phoneNumber,
      },
    })
    return verificationToken
  } catch {
    return null
  }
}
