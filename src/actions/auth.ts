"use server"
import { db } from "@/lib/db"
import z from "zod"
import {
  LoginSchema,
  PhoneNumberSchema,
  RegisterSchema,
  validateWithZodSchema,
  VerifyResetSchema,
} from "@/lib/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn, signOut } from "@/auth"
import { getUserByName, getUserByIdentifier, getUserByPhoneNumber } from "@/data/user"
import { comparePassword, generateSalt, hashPassword, renderError } from "@/lib/utils"
import { generateVerificationToken, sendPhoneNumberVerification } from "@/lib/tokens"
import { getVerificationToken } from "@/data/verification-token"

export const register = async (values: z.infer<typeof RegisterSchema>, token: string) => {
  try {
    const { name, password, phoneNumber } = validateWithZodSchema(RegisterSchema, values)
    const hashedPassword = hashPassword(password, generateSalt())

    const [existingToken, existingUser] = await Promise.all([
      getVerificationToken(phoneNumber, token),
      getUserByPhoneNumber(phoneNumber),
    ])

    if (!existingToken) return { error: "از صحت کد تایید اطمینان بررسی کنید" }
    if (existingUser) return { error: "کاربری با این شماره تلفن قبلاً ثبت شده است" }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
      await deleteUniqueVerificationToken(phoneNumber, token)
      return { error: "کد تایید منقضی شده است" }
    }

    await db.user.create({
      data: {
        phoneNumber,
        password: hashedPassword,
        name: name.toLocaleLowerCase(),
        phoneVerified: new Date(),
      },
    })

    await signIn("credentials", {
      identifier: phoneNumber,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: "کاربر با موفقیت ثبت نام و وارد شد" }
  } catch (error) {
    return renderError(error)
  }
}

export const newVerification = async (phoneNumber: string, name: string) => {
  try {
    const phoneNumberExist = await getUserByPhoneNumber(phoneNumber)
    const nameExist = await getUserByName(name)

    if (phoneNumberExist) throw new Error("شماره تلفن از قبل وجود دارد")
    if (nameExist) throw new Error("این نام کاربری از پیش انتخاب شده است")

    const verificationToken = generateVerificationToken(phoneNumber)
    await sendPhoneNumberVerification(verificationToken.phoneNumber, verificationToken.token)

    await deleteAllVerificationTokens(phoneNumber)

    await db.verificationToken.create({
      data: {
        phoneNumber: verificationToken.phoneNumber,
        expires: new Date(Date.now() + 2 * 60 * 1000),
        token: verificationToken.token,
      },
    })

    return { success: "کد تایید ارسال شد" }
  } catch (error) {
    return renderError(error)
  }
}

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const { identifier, password } = validateWithZodSchema(LoginSchema, values)

    const existingUser = await getUserByIdentifier(identifier)

    if (!existingUser || !existingUser?.password) {
      return { error: "کاربری با این مشخصات یافت نشد" }
    }

    if (!comparePassword(password, existingUser.password)) return { error: "رمز عبور صحت ندارد" }

    if (!existingUser.phoneVerified) return { error: "لطفاً شماره تلفن خود را تأیید کنید" }

    await signIn("credentials", {
      identifier,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: "ورود موفقیت‌آمیز بود" }
  } catch (error) {
    return renderError(error)
  }
}

export const logout = async () => {
  try {
    await signOut({ redirectTo: "/auth/login" })
  } catch (error) {
    return renderError(error)
  }
}

export const requestReset = async (phoneNumber: string) => {
  try {
    validateWithZodSchema(PhoneNumberSchema, phoneNumber)
    const existingUser = await getUserByPhoneNumber(phoneNumber)
    if (!existingUser) return { error: "کاربری با این شماره تلفن یافت نشد" }

    const verificationToken = generateVerificationToken(phoneNumber)
    await sendPhoneNumberVerification(verificationToken.phoneNumber, verificationToken.token)

    await deleteAllVerificationTokens(phoneNumber)

    await db.verificationToken.create({
      data: {
        phoneNumber: verificationToken.phoneNumber,
        token: verificationToken.token,
        expires: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes expiration
      },
    })

    return { success: "کد بازنشانی ارسال شد" }
  } catch (error) {
    return renderError(error)
  }
}

export const verifyReset = async (data: z.infer<typeof VerifyResetSchema>, token: string) => {
  try {
    const { password, phoneNumber } = validateWithZodSchema(VerifyResetSchema, data)

    const existingToken = await db.verificationToken.findUnique({
      where: {
        phoneNumber_token: {
          phoneNumber,
          token,
        },
      },
    })

    if (!existingToken) return { error: "کد تایید نامعتبر است" }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
      await deleteUniqueVerificationToken(phoneNumber, token)
      return { error: "کد تایید منقضی شده است" }
    }

    const hashedPassword = hashPassword(password, generateSalt())
    await db.user.update({
      where: { phoneNumber },
      data: { password: hashedPassword },
    })

    await db.verificationToken.delete({
      where: {
        phoneNumber_token: {
          phoneNumber,
          token,
        },
      },
    })

    await signIn("credentials", {
      identifier: phoneNumber,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: "رمز عبور با موفقیت تغییر کرد" }
  } catch (error) {
    return renderError(error)
  }
}

export const deleteAllVerificationTokens = async (phoneNumber: string) => {
  await db.verificationToken.deleteMany({
    where: {
      phoneNumber,
    },
  })
}

export const deleteUniqueVerificationToken = async (phoneNumber: string, token: string) => {
  await db.verificationToken.delete({
    where: {
      phoneNumber_token: {
        token,
        phoneNumber,
      },
    },
  })
}
