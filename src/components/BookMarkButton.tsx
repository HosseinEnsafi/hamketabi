"use client"
import { BookmarkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOptimistic } from "react"
import type { SaveableType, Saved } from "@prisma/client"
import { toast } from "sonner"
import { FeedType, UnifiedFeedItem } from "@/lib/types"
import { Button } from "./ui/button"
import { saveFeedItem } from "@/actions/feed"

interface BookMarkButtonProps {
  feed: UnifiedFeedItem
  userId: string
}

const BookMarkButton = ({ feed, userId }: BookMarkButtonProps) => {
  const { savedBy } = feed
  const predicate = (saved: Saved) => saved.userId === userId
  const [optimisticSaved, toggleOptimisticLSave] = useOptimistic(savedBy, (state, saved: Saved) =>
    state.some(predicate) ? state.filter((saved) => saved.userId !== userId) : [...state, saved],
  )

  return (
    <div>
      <form
        action={async (formData) => {
          const feedId = formData.get("feedId")!.toString()
          const type = formData.get("type")!.toString() as FeedType

          toggleOptimisticLSave({
            id: String(Math.random()),
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            saveableType: type as SaveableType,
            postId: null,
            quoteId: null,
            bookListId: null,
            bookId: null,
          })

          await saveFeedItem({ feedId, type })
        }}
      >
        <input type="hidden" name="feedId" value={feed.id} />
        <input type="hidden" name="type" value={feed.type} />
        <Button
          className="flex justify-center rounded-full p-1"
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
