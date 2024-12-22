"use client"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { BookIcon, PenIcon, PlusSquare, QuoteIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/lib/hook"
import { ButtonHTMLAttributes, useState } from "react"
import Link from "next/link"

const TriggerLink = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      {...props}
      variant={"ghost"}
      size={"lg"}
      className={cn(
        "w-full space-x-2 px-5 sm:px-4 md:justify-center lg:justify-start [&_svg]:size-5",
        className,
      )}
    >
      <PlusSquare className="w-6" />
      <p className={cn("hidden lg:block")}>ایجاد</p>
    </Button>
  )
}

const CreateLink = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <TriggerLink onClick={() => setOpen(true)} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="sr-only">ایجاد کنید؟</DialogTitle>
            <DialogDescription className="sr-only">
              گزینه ای که قصد ایجاد آن را دارید انتخاب کنید
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild></DialogClose>
          <CreateOptions onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <TriggerLink onClick={() => setOpen(true)} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="sr-only">ایجاد کنید؟</DrawerTitle>
          <DrawerDescription className="sr-only">
            گزینه ای که قصد ایجاد آن را دارید انتخاب کنید
          </DrawerDescription>
        </DrawerHeader>
        <CreateOptions onClose={() => setOpen(false)} />
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function CreateOptions({ onClose }: { onClose: () => void }) {
  return (
    <ul className="grid w-full list-none grid-cols-3 justify-items-center">
      <li className="inline-flex flex-col items-center justify-center gap-2">
        <Button onClick={onClose} variant={"outline"} size={"lg"} asChild>
          <Link href="/books/create">
            <BookIcon />
          </Link>
        </Button>
        <p> کتاب</p>
      </li>
      <li className="inline-flex flex-col items-center justify-center gap-2">
        <Button onClick={onClose} variant={"outline"} size={"lg"} asChild>
          <Link href="/posts/create">
            <PenIcon />
          </Link>
        </Button>
        <p> پست</p>
      </li>
      <li className="inline-flex flex-col items-center justify-center gap-2">
        <Button onClick={onClose} variant={"outline"} size={"lg"} asChild>
          <Link href="/quotes/create">
            <QuoteIcon />
          </Link>
        </Button>
        <p> بریده کتاب</p>
      </li>
    </ul>
  )
}

export default CreateLink
