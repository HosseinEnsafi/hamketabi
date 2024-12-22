"use client"
import { CreatePostSchema } from "@/lib/schemas"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Input } from "@/components/ui/input"
import UploadImagePostBtn from "./UploadImagePostBtn"
import { Textarea } from "./ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { Button } from "./ui/button"
import { createPost } from "@/actions/post"
import WordCount from "./WordCount"
import { MAX_BODY_POST, MAX_TITLE_POST, MIN_BODY_POST, MIN_TITLE_POST } from "@/lib/constants"
import { toast } from "sonner"
const CreatePostForm = () => {
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      body: "",
      image: "",
      title: "",
    },
  })

  const image = form.watch("image")

  const onSubmit = async (data: z.infer<typeof CreatePostSchema>) => {
    const res = await createPost(data)
    if ("error" in res) toast.error(res.error)
  }

  return (
    <div className="w-full max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان پست</FormLabel>
                <FormControl>
                  <Input placeholder="عنوان پست را وارد کنید" {...field} />
                </FormControl>
                <FormDescription>
                  <WordCount
                    currentLength={field.value.trim().length}
                    minLength={MIN_TITLE_POST}
                    maxLength={MAX_TITLE_POST}
                    isDirty={form.getFieldState("title").isDirty}
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>متن پست خود را بنویسید</FormLabel>
                <FormControl>
                  <Textarea className="min-h-40" {...field} />
                </FormControl>
                <FormDescription>
                  <WordCount
                    currentLength={field.value.trim().length}
                    minLength={MIN_BODY_POST}
                    maxLength={MAX_BODY_POST}
                    isDirty={form.getFieldState("body").isDirty}
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel className="mb-3 block w-full text-center text-xl">عکس پست</FormLabel>
                <FormControl>
                  <UploadImagePostBtn
                    onUploadCompleted={(url) => form.setValue("image", url)}
                    onUploadError={(error) => console.error("Image upload error:", error)}
                  />
                </FormControl>
                {image && (
                  <AspectRatio ratio={16 / 9} className="mt-4 w-full overflow-hidden">
                    <Image
                      src={image}
                      width={"1600"}
                      height={"900"}
                      alt="Post preview"
                      className="h-full w-full bg-center object-cover"
                    />
                  </AspectRatio>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-foreground disabled:bg-primary/80"
            type="submit"
          >
            ارسال پست
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreatePostForm
