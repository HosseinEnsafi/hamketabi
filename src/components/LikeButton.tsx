"use client"
import { cn } from "@/lib/utils"
import { HeartIcon } from "lucide-react"
import type { Like, LikeableType } from "@prisma/client"
import { toast } from "sonner"
import { useOptimisticLikes } from "@/lib/hooks"
import { createLike } from "@/actions/like"
interface LikeFeedProps {
  likes: Like[]
  likeableId: string
  likeableType: LikeableType
  userId: string
}

const LikeFeed = ({ likeableId, userId, likes, likeableType }: LikeFeedProps) => {
  const { optimisticLikes, toggleOptimisticLike, hasLiked } = useOptimisticLikes(likes, userId)

  return (
    <div>
      <form
        action={async () => {
          toggleOptimisticLike({ userId })
          const res = await createLike({ likeableId, likeableType })
          if (res && "error" in res) toast.error(res.error)
        }}
      >
        <button type="submit" className="outline-action-btn">
          <HeartIcon
            className={cn("size-5", {
              "fill-red-500 text-red-500": hasLiked,
            })}
          />
          <span className="text-sm leading-[0]" aria-label="تعداد لایک">
            {optimisticLikes.length}
          </span>
        </button>
      </form>
    </div>
  )
}
export default LikeFeed
