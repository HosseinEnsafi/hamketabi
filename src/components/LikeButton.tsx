"use client"
import { likeFeedItem } from "@/actions/feed"
import { FeedType, UnifiedFeedItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { HeartIcon } from "lucide-react"
import { useOptimistic } from "react"
import type { Like, LikeableType } from "@prisma/client"

import { toast } from "sonner"
interface LikeButtonProps {
  feed: UnifiedFeedItem
  userId: string
}

const LikeButton = ({ feed, userId }: LikeButtonProps) => {
  const { likes } = feed
  const predicate = (like: Like) => like.userId === userId

  const [optimisticLikes, toggleOptimisticLike] = useOptimistic(likes, (state, like: Like) =>
    state.some(predicate) ? state.filter((like) => like.userId !== userId) : [...state, like],
  )

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const feedId = formData.get("feedId")!.toString()
          const type = formData.get("type")!.toString() as FeedType

          toggleOptimisticLike({
            id: String(Math.random()),
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            likeableType: type as LikeableType,
            commentId: null,
            postId: null,
            quoteId: null,
            bookListId: null,
          })

          const res = await likeFeedItem({ feedId, type })
          if (res && "error" in res) toast.error(res.error)
        }}
      >
        <input type="hidden" name="feedId" value={feed.id} />
        <input type="hidden" name="type" value={feed.type} />
        <button type="submit" className="outline-action-btn">
          <HeartIcon
            className={cn(
              {
                "fill-red-500 text-red-500": optimisticLikes.some(predicate),
              },
              "size-5",
            )}
          />
          <span aria-label="like count">{optimisticLikes.length}</span>
        </button>
      </form>
    </div>
  )
}
export default LikeButton
