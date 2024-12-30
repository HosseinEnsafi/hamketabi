"use client"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import { CreateBookSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import UploadBookImageDD from "./UploadBookImageDD"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { createBook } from "@/actions/book"
import SelectCategory from "./SelectCategory"
import AddAuthors from "./AddAuthors"
import AddPublishers from "./AddPublishers"
import BookCover from "./BookCover"

const CreateBookForm = () => {
  const form = useForm<z.infer<typeof CreateBookSchema>>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      title: "",
      isbn: "",
      numOfPages: "",
      cover: "",
      publishers: [],
      authors: [],
      category: { name: "" },
    },
    mode: "all",
  })

  const onSubmit = async (data: z.infer<typeof CreateBookSchema>) => {
    const res = await createBook(data)
    if ("error" in res) {
      toast.error(res.error)
    } else {
      toast.success("کتاب با موفقیت ایجاد شد!")
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">اطلاعات کتاب</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-3 gap-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>عنوان کتاب</FormLabel>
                <FormControl>
                  <Input className="bg-muted" placeholder="مثال: جنایات و مکافات" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>شابک</FormLabel>
                <FormControl>
                  <Input className="bg-muted" placeholder="۱۳ رقم شابک" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numOfPages"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>تعداد صفحات</FormLabel>
                <FormControl>
                  <Input type="number" min={1} className="bg-muted" placeholder="مثال: ۲۸۰" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={() => (
              <FormItem className="col-span-2">
                <FormLabel>تصویر جلد</FormLabel>
                <FormControl>
                  <UploadBookImageDD
                    onUploadCompleted={(url) => form.setValue("cover", url)}
                    onUploadError={() => toast.error("خطا در ارسال تصویر")}
                  />
                </FormControl>
                {form.watch("cover") && (
                  <div className="flex w-full justify-center">
                    <BookCover alt="کاور کتاب" src={form.watch("cover")} />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>دسته بندی: </FormLabel>
                <FormControl>
                  <SelectCategory
                    selectedCategory={field.value}
                    onSelect={(category) => form.setValue("category", category)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authors"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <AddAuthors
                    onAdd={(authors) => form.setValue("authors", authors)}
                    authors={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishers"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <AddPublishers
                    publishers={field.value}
                    onAdd={(publishers) => form.setValue("publishers", publishers)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            className="col-span-2 text-foreground disabled:bg-primary/80"
            type="submit"
          >
            تایید کتاب
          </Button>
        </form>
      </Form>
    </>
  )
}

export default CreateBookForm
