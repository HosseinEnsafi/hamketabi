import z, { ZodSchema } from "zod"
import { MAX_BODY_POST, MAX_TITLE_POST, MIN_BODY_POST, MIN_TITLE_POST } from "./constants"
const phoneRegex = /^09[0-9]{9}$/
const isEnglishAlphabetRegex = /^[a-zA-Z]+$/

const requiredMessage = (field: string) => `${field} باید مقدار داشته باشد`
const emptyMessage = (field: string) => `${field} نمیتواند خالی باشد`
const minMessage = (field: string, length: number) => `${field} باید حداقل ${length} کاراکتر باشد`
const maxMessage = (field: string, length: number) => `${field} باید حداکثر ${length} کاراکتر باشد`

const lengthMessage = (field: string, length: number) => `${field} باید ${length} کاراکتر باشد`

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    throw new Error(errors.join(", "))
  }

  return result.data
}

const IdSchema = z
  .string({ message: requiredMessage("آیدی") })
  .trim()
  .min(1, { message: emptyMessage("آیدی") })

export const UserSchema = z.object({
  id: IdSchema,
  phoneNumber: z
    .string({ message: requiredMessage("شماره تلفن") })
    .regex(phoneRegex, { message: "فرمت شماره موبایل درست نیست" }),
  password: z.string().trim().min(8, { message: "رمز عبور نمیتواند کمتر از 8 کاراکتر باشد" }),
  name: z
    .string({ message: requiredMessage("نام کاربری") })
    .trim()
    .min(1, { message: emptyMessage("نام کاربری") })
    .regex(isEnglishAlphabetRegex, { message: "فقط از حروف انگلیسی استفاده شود" }),
  identifier: z
    .string({ message: requiredMessage("شناسه کاربری") })
    .trim()
    .min(1, { message: emptyMessage("شناسه کاربری") })
    .refine((data) => phoneRegex.test(data) || isEnglishAlphabetRegex.test(data), {
      message: "شناسه کاربری باید شماره تلفن معتبر یا نام کاربری انگلیسی باشد",
    }),
})

export const RegisterSchema = UserSchema.pick({
  phoneNumber: true,
  password: true,
  name: true,
})

export const LoginSchema = UserSchema.pick({
  identifier: true,
  password: true,
})

export const VerifyResetSchema = UserSchema.pick({
  phoneNumber: true,
  password: true,
})

export const PhoneNumberSchema = UserSchema.shape.phoneNumber
export const PasswordSchema = UserSchema.shape.password

export const PostSchema = z.object({
  id: IdSchema,
  title: z
    .string({ message: requiredMessage("عنوان") })
    .min(MIN_TITLE_POST, { message: minMessage("عنوان", MIN_TITLE_POST) })
    .max(MAX_TITLE_POST, { message: maxMessage("عنوان", MAX_TITLE_POST) }),
  body: z
    .string({ message: requiredMessage("متن") })
    .min(MIN_BODY_POST, { message: minMessage("متن", MIN_BODY_POST) })
    .max(MAX_BODY_POST, { message: maxMessage("متن", MAX_BODY_POST) }),
  image: z.string({ message: requiredMessage("آدرس عکس") }).url({ message: "فرمت آدرس عکس صحیح نیست" }),
})

export const CreatePostSchema = PostSchema.omit({ id: true })
export const DeletePostSchema = PostSchema.pick({ id: true })

export const FeedSchema = z.object({
  feedId: IdSchema,
  type: z.string({ message: requiredMessage("نوع فید") }),
})

export const LikeSchema = z.object({
  feedId: IdSchema,
})

export const BookmarkSchema = z.object({
  feedId: IdSchema,
})

const CommentSchema = z.object({
  id: IdSchema,
  feedId: IdSchema,
  body: z.string({ message: requiredMessage("کامنت") }),
})

export const CreateCommentSchema = CommentSchema.omit({ id: true })
export const DeleteCommentSchema = CommentSchema.pick({ id: true })
