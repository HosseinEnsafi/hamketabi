"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CardWrapper from "@/components/auth/card-wrapper"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PhoneNumberSchema, PasswordSchema } from "@/lib/schemas"
import { requestReset, verifyReset } from "@/actions/auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { REGEXP_ONLY_DIGITS } from "input-otp"

const ResetForm = () => {
  const [isPending, startTransition] = useTransition()
  const [requestError, setRequestError] = useState<string | undefined>()
  const [requestSuccess, setRequestSuccess] = useState<string | undefined>()
  const [verifyError, setVerifyError] = useState<string | undefined>()
  const [verifySuccess, setVerifySuccess] = useState<string | undefined>()
  const [step, setStep] = useState<"request" | "verify">("request")
  const [otp, setOtp] = useState("")

  // Phone number form
  const phoneForm = useForm({
    resolver: zodResolver(PhoneNumberSchema),
    defaultValues: {
      phoneNumber: "",
    },
  })

  // Password form
  const passwordForm = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const handleSendOTP = (values: z.infer<typeof PhoneNumberSchema>) => {
    setRequestError("")
    setRequestSuccess("")
    startTransition(() => {
      requestReset(values).then((data) => {
        if ("success" in data) {
          setRequestSuccess(data.success)
          setStep("verify")
        }
        if ("error" in data) setRequestError(data.error)
      })
    })
  }

  const handleVerifyOTP = (values: { password: string }) => {
    const { phoneNumber } = phoneForm.getValues()
    setVerifyError("")
    setVerifySuccess("")
    startTransition(() => {
      verifyReset({ ...values, phoneNumber }, otp).then((data) => {
        if ("success" in data) {
          setVerifySuccess("بازیابی با موفقیت انجام شد!")
        }
        if ("error" in data) setVerifyError(data.error)
      })
    })
  }

  return (
    <>
      {step === "request" && (
        <CardWrapper
          headerLabel="بازیابی رمز عبور"
          cardFooter={
            <Button variant={"link"} asChild>
              <Link href={"/auth/login"}>رمز عبور را به خاطر دارید</Link>
            </Button>
          }
        >
          <Form {...phoneForm}>
            <form
              className="flex flex-col space-y-4"
              onSubmit={phoneForm.handleSubmit(handleSendOTP)}
            >
              <FormField
                control={phoneForm.control}
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
              <FormError message={requestError} />
              <FormSuccess message={requestSuccess} />
              <Button disabled={isPending}>ارسال کد</Button>
            </form>
          </Form>
        </CardWrapper>
      )}
      {step === "verify" && (
        <CardWrapper headerLabel="تایید کد" onPrevClick={() => setStep("request")}>
          <Form {...passwordForm}>
            <form
              className="flex flex-col space-y-4"
              onSubmit={passwordForm.handleSubmit(handleVerifyOTP)}
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور جدید</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        dir="ltr"
                        style={{ direction: "ltr" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <InputOTP
                maxLength={6}
                disabled={isPending}
                pattern={REGEXP_ONLY_DIGITS}
                onChange={(value) => setOtp(value)}
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
              <Button disabled={isPending}>تایید</Button>
            </form>
          </Form>
        </CardWrapper>
      )}
    </>
  )
}

export default ResetForm
