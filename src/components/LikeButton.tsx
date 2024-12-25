"use client"
import { likeFeedItem } from "@/actions/feed"
import { cn } from "@/lib/utils"
import { HeartIcon } from "lucide-react"
import { useOptimistic } from "react"
import type { Like } from "@prisma/client"

import { toast } from "sonner"
import { FeedType } from "@/lib/types"
interface LikeButtonProps {
  likes: Like[]
  feedId: string
  feedType: FeedType
  userId: string
}

const LikeButton = ({ feedId, userId, likes, feedType }: LikeButtonProps) => {
  const predicate = (like: Like) => like.userId === userId

  const [optimisticLikes, toggleOptimisticLike] = useOptimistic(likes, (state, newLike) =>
    // @ts-expect-error only need userId for evaluation. others are not needed
    state.some(predicate) ? state.filter((like) => like.userId !== userId) : [...state, newLike],
  )

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const feedId = formData.get("feedId")!.toString()
          const type = formData.get("type")!.toString()

          toggleOptimisticLike({ userId })

          const res = await likeFeedItem({ feedId, type })
          if (res && "error" in res) toast.error(res.error)
        }}
      >
        <input type="hidden" name="feedId" value={feedId} />
        <input type="hidden" name="type" value={feedType} />
        <button type="submit" className="outline-action-btn">
          <HeartIcon
            className={cn("size-5", {
              "fill-red-500 text-red-500": optimisticLikes.some(predicate),
            })}
          />
          <span aria-label="تعداد لایک">{optimisticLikes.length}</span>
        </button>
      </form>
    </div>
  )
}
export default LikeButton
