import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByIdentifier } from "@/data/user"
import { LoginSchema } from "@/lib/schemas"
import { comparePassword } from "@/lib/utils"

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.error) return null

        const { password, identifier } = validatedFields.data
        const user = await getUserByIdentifier(identifier)

        if (!user || !user.password) return null

        if (!user.phoneVerified) return null

        const matched = comparePassword(password, user.password)
        return matched ? user : null
      },
    }),
  ],
} satisfies NextAuthConfig
