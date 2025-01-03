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
    <div className={cn("flex flex-row-reverse items-center gap-2", className)}>
      <LikeButton likeableType="COMMENT" likeableId={comment.id} likes={comment.likes} userId={userId} />
    </div>
  )
}
export default CommentActions
