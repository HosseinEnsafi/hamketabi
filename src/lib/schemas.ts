import z, { ZodSchema } from "zod"
const phoneRegex = /^09[0-9]{9}$/
const isEnglishAlphabetRegex = /^[a-zA-Z]+$/

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

export const LoginSchema = z.object({
  identifier: z
    .string({ message: requiredMessage("شناسه کاربری") })
    .trim()
    .min(1, { message: emptyMessage("شناسه کاربری") })
    .refine((data) => phoneRegex.test(data) || isEnglishAlphabetRegex.test(data), {
      message: "شناسه کاربری باید شماره تلفن معتبر یا نام کاربری انگلیسی باشد",
    }),
  password: z.string().min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" }),
})

export const VerifyResetSchema = RegisterSchema.pick({
  phoneNumber: true,
  password: true,
})

export const PhoneNumberSchema = RegisterSchema.shape.phoneNumber
export const PasswordSchema = RegisterSchema.shape.password
