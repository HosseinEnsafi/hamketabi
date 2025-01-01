"use client"
import { BookWithExtras, ReviewWithExtras } from "@/lib/types"
import BookPreview from "./BookPreview"
import RateBook from "./RateBook"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateReviewSchema } from "@/lib/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "./ui/form"
import WordCount from "./WordCount"
import { MAX_BODY_REVIEW, MIN_BODY_REVIEW } from "@/lib/constants"
import { Textarea } from "./ui/textarea"
import { useCallback, useMemo } from "react"
import { Button } from "./ui/button" // Import the Button component
import { zodResolver } from "@hookform/resolvers/zod"
import { createReview } from "@/actions/review"
import { toast } from "sonner"

interface Props {
  book: BookWithExtras
  userId: string
}

const CreateReviewForm = ({ book, userId }: Props) => {
  const predicate = useCallback((review: ReviewWithExtras): boolean => review.userId === userId, [userId])

  const existingBook = useMemo(() => book.reviews.find(predicate), [book.reviews, predicate])
  const rating = existingBook?.rating
  const body = existingBook?.body

  const form = useForm<z.infer<typeof CreateReviewSchema>>({
    resolver: zodResolver(CreateReviewSchema),
    defaultValues: {
      body: body ?? "",
      bookId: book.id,
      rating: String(rating ?? ""),
    },
  })

  const onSubmit = async (values: z.infer<typeof CreateReviewSchema>) => {
    const res = await createReview(values)
    if ("error" in res) toast.error(res.error)
  }

  return (
    <div className="flex flex-col space-y-5">
      <BookPreview book={book} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="rating"
            render={() => (
              <FormItem>
                <FormControl>
                  <RateBook
                    bookId={book.id}
                    reviews={book.reviews}
                    userId={userId}
                    onRate={(rating) => {
                      form.setValue("rating", String(rating))
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نظر خود را درباره این کتاب بنویسید</FormLabel>

                <FormControl>
                  <Textarea className="min-h-40 bg-muted" {...field} />
                </FormControl>
                <FormDescription>
                  <WordCount
                    currentLength={field.value.trim().length}
                    minLength={MIN_BODY_REVIEW}
                    maxLength={MAX_BODY_REVIEW}
                    isDirty={form.getFieldState("body").isDirty}
                  />
                </FormDescription>
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full text-white sm:w-auto">
            ارسال نظر
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateReviewForm
