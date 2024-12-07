import { getVerificationTokenByPhoneNumber } from "@/data/verification-token"
import { db } from "./db"
import { generateRandomInt } from "./utils"

export const generateVerificationToken = async (phoneNumber: string) => {
  const expires = new Date(Date.now() + 2 * 60 * 1000)

  const existingToken = await getVerificationTokenByPhoneNumber(phoneNumber)
  const token = String(generateRandomInt(121122, 988899))

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      phoneNumber: phoneNumber,
      expires,
      token,
    },
  })

  return verificationToken
}

export const sendPhoneNumberVerification = async (phoneNumber: string, token: string) => {
  const smsUrl = process.env.SMS_URL!
  const Username = process.env.SMS_USERNAME!
  const Password = process.env.SMS_PASSWORD!
  const smsMessage = `به همکتابی خوش آمدید. کد تایید شما ${token} می باشد\n مدت اعتبار این کد 2 دقیقه است.`

  const params = new URLSearchParams({
    Username,
    Password,
    Mobile: phoneNumber,
    Message: smsMessage,
  })

  try {
    const response = await fetch(smsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    if (!response.ok) {
      throw new Error("خطا در ارسال کد تایید")
    }
  } catch (error) {
    throw error
  }
}
