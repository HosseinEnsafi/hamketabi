"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "../ui/button"
import { MoveRightIcon } from "lucide-react"
import { ReactNode } from "react"

interface CardWrapperProps {
  children: ReactNode
  headerLabel: string
  cardFooter?: ReactNode
  onPrevClick?: () => void
}

const CardWrapper = ({
  children,
  headerLabel,
  cardFooter,
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

      {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
    </Card>
  )
}

export default CardWrapper
