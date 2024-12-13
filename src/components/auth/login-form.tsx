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
import Link from "next/link"

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
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
      headerLabel="ورود به حساب کاربری"
      cardFooter={
        <div className="flex w-full items-center justify-between">
          <Button variant={"link"} asChild>
            <Link href={"/auth/register"}>هنوز حساب کاربری ندارید</Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link href={"/auth/reset"}>رمز عبور را فراموش کردم</Link>
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره تلفن یا نام کاربری</FormLabel>
                <FormControl>
                  <Input style={{ direction: "ltr" }} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
