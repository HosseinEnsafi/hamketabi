"use client"
import { BookmarkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SaveableType, Saved } from "@prisma/client"
import { Button } from "./ui/button"
import { useOptimisticSaved } from "@/lib/hooks"
import { toggleSaved } from "@/actions/saved"
import { toast } from "sonner"

interface BookMarkButtonProps {
  saveableId: string
  savedBy: Saved[]
  saveableType: SaveableType
  userId: string
}

const BookMarkButton = ({ saveableId, saveableType, savedBy, userId }: BookMarkButtonProps) => {
  const { toggleOptimisticSaved, hasSaved } = useOptimisticSaved(savedBy, userId)
  return (
    <div>
      <form
        action={async () => {
          toggleOptimisticSaved({ userId })
          const res = await toggleSaved({ saveableId, saveableType })
          if (res && "error" in res) toast.error(res.error)
        }}
      >
        <Button
          className="flex justify-center rounded-full p-1 [&_svg]:size-5"
          type="submit"
          variant={"ghost"}
          size={"icon"}
        >
          <BookmarkIcon
            className={cn("", {
              "!fill-primary !text-primary": hasSaved,
            })}
          />
        </Button>
      </form>
    </div>
  )
}

export default BookMarkButton
