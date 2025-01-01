"use client"
import { cn } from "@/lib/utils"
import { HeartIcon } from "lucide-react"
import type { Like } from "@prisma/client"
import { useOptimisticLikes } from "@/lib/hooks"
import { createLike } from "@/actions/like"

interface LikeButtonProps {
  likes: Like[]
  likeableId: string
  userId: string
}

const LikeButton = ({ likeableId, likes, userId }: LikeButtonProps) => {
  const { optimisticLikes, toggleOptimisticLike, hasLiked } = useOptimisticLikes(likes, userId)

  return (
    <div>
      <form
        action={async () => {
          toggleOptimisticLike({ userId })
          await createLike({ likeableId, likeableType: "COMMENT" })
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
export default LikeButton
