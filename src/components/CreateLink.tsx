"use client"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { BookIcon, PenIcon, PlusSquare, QuoteIcon } from "lucide-react"
import Modal from "./Modal"
import { ButtonHTMLAttributes, useState } from "react"
import Link from "next/link"

const TriggerLink = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
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

  const modalTitle = "ایجاد کنید؟"
  const modalDesc = "گزینه ای که قصد ایجاد آن را دارید انتخاب کنید"

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title={modalTitle}
      description={modalDesc}
      trigger={<TriggerLink onClick={() => setOpen(true)} />}
    >
      <CreateOptions onClose={() => setOpen(false)} />
    </Modal>
  )
}

function CreateOptions({ onClose }: { onClose: () => void }) {
  return (
    <ul className="grid w-full list-none grid-cols-3 place-content-center p-4">
      <li className="inline-flex flex-col items-center justify-center gap-1">
        <Button onClick={onClose} variant={"outline"} size={"lg"} asChild>
          <Link href="/books/create">
            <BookIcon />
          </Link>
        </Button>
        <p> کتاب</p>
      </li>
      <li className="inline-flex flex-col items-center justify-center gap-1">
        <Button onClick={onClose} variant={"outline"} size={"lg"} asChild>
          <Link href="/posts/create">
            <PenIcon />
          </Link>
        </Button>
        <p> پست</p>
      </li>
      <li className="inline-flex flex-col items-center justify-center gap-1">
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
