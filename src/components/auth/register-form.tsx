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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/lib/schemas"
import z from "zod"
import { Button } from "../ui/button"
import { useState, useTransition } from "react"
import { register } from "@/actions/auth"
import { FormError } from "../form-error"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { FormSuccess } from "../form-success"

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError("")
    setSuccess("")
    startTransition(() => {
      register(values).then((data) => {
        if ("error" in data) setError(data.error)
        if ("success" in data) setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="از قبل ثبت نام کرده ام"
      headerLabel="ثبت نام"
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
                  <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input dir="ltr" type="name" {...field} />
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

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending}>ثبت نام</Button>
        </form>
      </Form>

      {success && (
        <InputOTP className="" maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup
            className="mt-4 flex w-full items-center justify-center"
            dir="ltr"
            style={{ direction: "ltr" }}
          >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )}
    </CardWrapper>
  )
}
export default LoginForm
