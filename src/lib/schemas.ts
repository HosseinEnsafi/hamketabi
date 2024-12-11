import z, { ZodSchema } from "zod"
const phoneRegex = /^09[0-9]{9}$/
const isEnglishAlphabetRegex = /^[a-zA-Z]+$/
const onlyNumberRegex = /^[0-9]*$/

const requiredMessage = (field: string) => `${field} نمیتواند خالی باشد`
const emptyMessage = (field: string) => `${field} باید مقدار داشته باشد`
const lengthMessage = (field: string, length: number) =>
  `${field} باید ${length} کاراکتر باشد`

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    throw new Error(errors.join(", "))
  }

  return result.data
}

export const RegisterSchema = z.object({
  phoneNumber: z
    .string({ message: requiredMessage("شماره تلفن") })
    .regex(phoneRegex, { message: "فرمت شماره موبایل درست نیست" }),
  password: z
    .string()
    .trim()
    .min(8, { message: lengthMessage("رمز عبور", 8) }),
  name: z
    .string({ message: requiredMessage("نام کاربری") })
    .trim()
    .min(1, { message: emptyMessage("نام کاربری") })
    .regex(isEnglishAlphabetRegex, { message: "فقط از حروف انگلیسی استفاده شود" }),
})

export const LoginSchema = RegisterSchema.pick({
  phoneNumber: true,
  password: true,
})

export const VerifyResetSchema = RegisterSchema.pick({
  password: true,
  phoneNumber: true,
})

export const PhoneNumberSchema = RegisterSchema.pick({ phoneNumber: true })
export const PasswordSchema = RegisterSchema.pick({ password: true })
