"use client"
import {
  FormField,
  Form,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import CardWrapper from "./card-wrapper"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/lib/schemas"
import z from "zod"
import { Button } from "../ui/button"
import { useState, useTransition } from "react"
import { login } from "@/actions/auth"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values).then((data) => {
        if (!data) return
        if ("error" in data) setError(data.error)
        if ("success" in data) setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper
      backButtonHref="/auth/register"
      backButtonLabel="هنوز حساب کاربری ندارید؟ "
      headerLabel="ورود به حساب کاربری"
    >
      <Form {...form}>
        <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره تلفن</FormLabel>
                <FormControl>
                  <Input
                    style={{ direction: "ltr" }}
                    placeholder="شماره تلفن خود را وارد کنید"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <Input dir="ltr" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending}>ورود</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
export default LoginForm
