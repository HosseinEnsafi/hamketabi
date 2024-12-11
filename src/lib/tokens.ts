import { generateRandomInt } from "./utils"

export const generateVerificationToken = (phoneNumber: string) => {
  const expires = new Date(Date.now() + 2 * 60 * 1000)
  const token = String(generateRandomInt(100122, 988899))
  return { token, phoneNumber, expires }
}

export const sendPhoneNumberVerification = async (phoneNumber: string, token: string) => {
  const smsUrl = process.env.SMS_URL!
  const Username = process.env.SMS_USERNAME!
  const Password = process.env.SMS_PASSWORD!
  const Message = `به همکتابی خوش آمدید. کد تایید شما ${token} می باشد\n مدت اعتبار این کد 2 دقیقه است.`

  const params = new URLSearchParams({
    Username,
    Password,
    Mobile: phoneNumber,
    Message,
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
