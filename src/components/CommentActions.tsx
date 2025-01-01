import { CommentWithExtras } from "@/lib/types"
import { cn } from "@/lib/utils"
import LikeButton from "./LikeButton"

interface CommentActionsProps {
  className?: string
  userId: string
  comment: CommentWithExtras
}

const CommentActions = ({ userId, className, comment }: CommentActionsProps) => {
  return (
    <div className={cn(className)}>
      <div className="flex flex-row-reverse items-center justify-between px-3">
        <div className="flex flex-row-reverse items-center gap-2">
          <LikeButton likeableId={comment.id} likes={comment.likes} userId={userId} />
        </div>
      </div>
    </div>
  )
}
export default CommentActions
