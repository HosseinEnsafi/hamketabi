"use server"

import { db } from "@/lib/db"
import { CreateBookSchema, validateWithZodSchema } from "@/lib/schemas"
import { renderError } from "@/lib/utils"
import { z } from "zod"
import { redirect } from "next/navigation"

export const createBook = async (values: z.infer<typeof CreateBookSchema>) => {
  try {
    const { cover, isbn, numOfPages, title, authors, publishers, category } = validateWithZodSchema(
      CreateBookSchema,
      values,
    )

    const book = await db.book.findFirst({
      where: {
        OR: [{ isbn }, { title }],
      },
    })

    if (book) return { error: "این کتاب از قبل وجود دارد" }

    const { id } = await db.book.create({
      data: {
        isbn,
        title,
        numOfPages: Math.abs(parseInt(numOfPages)),
        cover,
        category: {
          connectOrCreate: {
            where: { name: category.name },
            create: { ...category },
          },
        },
        authors: {
          create: authors.map((author) => ({
            author: {
              connectOrCreate: {
                where: { name: author.name },
                create: { ...author },
              },
            },
          })),
        },
        publishers: {
          create: publishers.map((publisher) => ({
            publisher: {
              connectOrCreate: {
                where: { name: publisher.name },
                create: { name: publisher.name },
              },
            },
            publishedAt: publisher.publishedAt,
          })),
        },
      },
    })

    redirect(`/books/${id}`)
  } catch (error) {
    return renderError(error)
  }
}
