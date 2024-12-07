"use server"
import { signIn } from "@/auth"
import { getUserByName, getUserByPhoneNumber } from "@/data/user"
import { db } from "@/lib/db"
import { hashPassword, renderError } from "@/lib/utils"
import { LoginSchema, RegisterSchema, validateWithZodSchema } from "@/lib/schemas"
// import { ActionResponse } from "@/lib/types"
import z from "zod"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { generateVerificationToken, sendPhoneNumberVerification } from "@/lib/tokens"
import { getVerificationToken } from "@/data/verification-token"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const { name, password, phoneNumber } = validateWithZodSchema(RegisterSchema, values)
    const hashedPassword = hashPassword(password)
    const phoneNumberExist = await getUserByPhoneNumber(phoneNumber)
    const nameExist = await getUserByName(name)

    if (phoneNumberExist) throw new Error("شماره تلفن از قبل وجود دارد")
    if (nameExist) throw new Error("این نام کاربری از پیش انتخاب شده است")

    await db.user.create({
      data: {
        phoneNumber,
        password: hashedPassword,
        name,
      },
    })

    const verificationToken = await generateVerificationToken(phoneNumber)
    await sendPhoneNumberVerification(
      verificationToken.phoneNumber,
      verificationToken.token,
    )
    return { success: "کد تایید با موفق ارسال شد" }
  } catch (error) {
    return renderError(error)
  }
}

export const login = async (values: z.infer<typeof LoginSchema>) => {
  let validatedFields

  try {
    validatedFields = validateWithZodSchema(LoginSchema, values)
  } catch (error) {
    return renderError(error)
  }

  const { phoneNumber, password } = validatedFields

  const existingUser = await getUserByPhoneNumber(phoneNumber)

  if (!existingUser) {
    return { error: "کاربری با این مشخصات یافت نشد" }
  }

  try {
    await signIn("credentials", {
      phoneNumber,
      password,
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "شماره تلفن با رمز ورود تطابق ندارد" }
        default:
          return { error: "خطای نامشخصی رخ داد" }
      }
    }

    throw error
  }
}

export const newVerification = async (phoneNumber: string, token: string) => {
  const existingToken = await getVerificationToken(phoneNumber, token)
  if (!existingToken) return { error: "کد تایید یافت نشد" }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: "کد تایید منقضی شده است" }

  const existingUser = await getUserByPhoneNumber(existingToken.phoneNumber)
  if (!existingUser) return { error: "شماره تلفن وجود ندارد" }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      phoneVerified: new Date(),
      phoneNumber: existingToken.phoneNumber,
    },
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: "Email verified!" }
}
