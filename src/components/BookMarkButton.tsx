"use client"
import { BookmarkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOptimistic } from "react"
import type { Saved } from "@prisma/client"
import { FeedType } from "@/lib/types"
import { Button } from "./ui/button"
import { saveFeedItem } from "@/actions/feed"

interface BookMarkButtonProps {
  feedId: string
  savedBy: Saved[]
  feedType: FeedType
  userId: string
}

const BookMarkButton = ({ feedId, feedType, savedBy, userId }: BookMarkButtonProps) => {
  const predicate = (saved: Saved) => saved.userId === userId
  const [optimisticSaved, toggleOptimisticLSave] = useOptimistic(savedBy, (state, newSaved) =>
    // @ts-expect-error only need userId for evaluation. others are not needed
    state.some(predicate) ? state.filter((saved) => saved.userId !== userId) : [...state, newSaved],
  )

  return (
    <div>
      <form
        action={async (formData) => {
          const feedId = formData.get("feedId")!.toString()
          const type = formData.get("type")!.toString() as FeedType

          toggleOptimisticLSave({ userId })

          await saveFeedItem({ feedId, type })
        }}
      >
        <input type="hidden" name="feedId" value={feedId} />
        <input type="hidden" name="type" value={feedType} />
        <Button
          className="flex justify-center rounded-full p-1 [&_svg]:size-5"
          type="submit"
          variant={"ghost"}
          size={"icon"}
        >
          <BookmarkIcon
            className={cn("", {
              "!fill-primary !text-primary": optimisticSaved.some(predicate),
            })}
          />
        </Button>
      </form>
    </div>
  )
}

export default BookMarkButton
