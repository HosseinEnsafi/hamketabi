"use client"
import { FeedType } from "@/lib/types"
import { MessageCircleIcon } from "lucide-react"
import Link from "next/link"

interface CommentButtonProps {
  commentsCount: number
  feedId: string
  feedType: FeedType
  userId: string
}

const CommentButton = ({ feedId, feedType, commentsCount, userId }: CommentButtonProps) => {
  return (
    <div>
      <input type="hidden" name="feedId" value={feedId} />
      <input type="hidden" name="type" value={feedType} />
      <Link href={`${feedType.toLowerCase()}s/${feedId}`}>
        <button type="submit" className="outline-action-btn">
          <MessageCircleIcon />
          <span>{commentsCount}</span>
        </button>
      </Link>
    </div>
  )
}
export default CommentButton
