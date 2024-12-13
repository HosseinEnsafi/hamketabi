import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"
import { Prisma } from "@prisma/client"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (min - max + 1)) + max
}

export const renderError = (error: unknown): { error: string } => {
  const isDevelopment = process.env.APP_ENV !== "production"

  if (isRedirectError(error)) throw error

  if (error instanceof AuthError) {
    if (error.type === "CredentialsSignin")
      return { error: "شماره تلفن یا رمز ورود معتبر نیست" }

    return { error: "خطای نامشخصی هنگام ورود رخ داد" }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const userMessage =
      "خطایی در پردازش درخواست شما رخ داده است. لطفاً داده‌های خود را بررسی کرده و دوباره تلاش کنید."
    const devMessage = `خطای درخواست Prisma: ${error.message}. کد خطا: ${error.code}. محدودیت‌های داده را بررسی کنید.`
    return {
      error: isDevelopment ? devMessage : userMessage,
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    const userMessage =
      "داده‌های ورودی نامعتبر است. لطفاً اطلاعات صحیح را وارد کرده و دوباره تلاش کنید."
    const devMessage = `خطای اعتبارسنجی Prisma: ${error.message}. اطمینان حاصل کنید که داده‌های ورودی با نوع‌های مورد انتظار مطابقت دارند.`
    return {
      error: isDevelopment ? devMessage : userMessage,
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    const userMessage =
      "در اتصال به پایگاه داده مشکلی پیش آمده است. لطفاً بعداً دوباره تلاش کنید."
    const devMessage = `خطای راه‌اندازی Prisma: ${error.message}. اتصال به پایگاه داده را بررسی کنید.`
    return {
      error: isDevelopment ? devMessage : userMessage,
    }
  }

  const userMessage = "یک خطای غیرمنتظره رخ داده است. لطفاً بعداً دوباره تلاش کنید."
  const devMessage =
    error instanceof Error ? error.message : "یک خطای ناشناخته رخ داده است."

  return {
    error: isDevelopment ? devMessage : userMessage,
  }
}

const salt = "6f30fe2f285f82dae28f5d2294e12ee3"

export function hashPassword(password: string) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  return hash
}

export function comparePassword(password: string, storedHash: string) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  return hash === storedHash
}
