import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })

    return user
  } catch {
    return null
  }
}

export const getUserByIdentifier = async (identifier: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        OR: [{ name: identifier.toLocaleLowerCase() }, { phoneNumber: identifier }],
      },
    })
    return user
  } catch {
    return null
  }
}

export const getUserByPhoneNumber = async (phoneNumber: string) => {
  try {
    const user = await db.user.findUnique({ where: { phoneNumber } })
    return user
  } catch {
    return null
  }
}
export const getUserByName = async (name: string) => {
  try {
    const user = await db.user.findUnique({ where: { name: name.toLocaleLowerCase() } })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })

    return user
  } catch {
    return null
  }
}
