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
import { register, newVerification } from "@/actions/auth"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import Link from "next/link"

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [registerError, setRegisterError] = useState<string | undefined>()
  const [registerSuccess, setRegisterSuccess] = useState<string | undefined>()
  const [verifyError, setVerifyError] = useState<string | undefined>()
  const [verifySuccess, setVerifySuccess] = useState<string | undefined>()
  const [step, setStep] = useState<"register" | "verify">("register")
  const [otp, setOtp] = useState("")

  const regForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      name: "",
    },
  })

  const handleSendOTP = (values: z.infer<typeof RegisterSchema>) => {
    setRegisterError("")
    setRegisterSuccess("")
    startTransition(() => {
      newVerification(values.phoneNumber, values.name).then((data) => {
        if ("success" in data) {
          setRegisterSuccess(data.success)
          setStep("verify")
        }
        if ("error" in data) setRegisterError(data.error)
      })
    })
  }

  const handleVerifyOTP = () => {
    const regData = regForm.getValues()
    setVerifyError("")
    setVerifySuccess("")
    startTransition(() => {
      register(regData, otp).then((data) => {
        if ("success" in data) {
          setVerifySuccess("ثبت‌نام با موفقیت انجام شد!")
        }
        if ("error" in data) setVerifyError(data.error)
      })
    })
  }

  return (
    <>
      {step === "register" && (
        <CardWrapper
          cardFooter={
            <Button variant={"link"} asChild>
              <Link href={"/auth/login"}>از قبل ثبت نام کرده ام</Link>
            </Button>
          }
          headerLabel="ثبت نام"
        >
          <Form {...regForm}>
            <form
              className="flex flex-col space-y-4"
              onSubmit={regForm.handleSubmit(handleSendOTP)}
            >
              <FormField
                control={regForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تلفن</FormLabel>
                    <FormControl>
                      <Input style={{ direction: "ltr" }} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={regForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام کاربری</FormLabel>
                    <FormControl>
                      <Input dir="ltr" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={regForm.control}
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
              <FormError message={registerError} />
              <FormSuccess message={registerSuccess} />
              <Button disabled={isPending}>ارسال کد</Button>
            </form>
          </Form>
        </CardWrapper>
      )}

      {step === "verify" && (
        <CardWrapper headerLabel="تایید کد" onPrevClick={() => setStep("register")}>
          <div className="space-y-6">
            <InputOTP
              maxLength={6}
              disabled={isPending}
              pattern={REGEXP_ONLY_DIGITS}
              onChange={(value) => setOtp(value)}
              onComplete={handleVerifyOTP}
            >
              <InputOTPGroup
                className="mt-4 flex w-full items-center justify-center"
                dir="ltr"
              >
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <FormError message={verifyError} />
            <FormSuccess message={verifySuccess} />
          </div>
        </CardWrapper>
      )}
    </>
  )
}

export default LoginForm
