"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "../ui/button"
import Link from "next/link"
import { MoveRightIcon } from "lucide-react"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel?: string
  backButtonHref?: string
  onPrevClick?: () => void
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  onPrevClick,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        {onPrevClick && (
          <Button
            variant={"ghost"}
            onClick={onPrevClick}
            className="size-8 cursor-pointer rounded-full p-4"
          >
            <MoveRightIcon />
          </Button>
        )}
        <h2 className="text-center text-2xl font-semibold">{headerLabel}</h2>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {backButtonHref && (
        <CardFooter>
          <Button variant={"link"} asChild>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default CardWrapper
