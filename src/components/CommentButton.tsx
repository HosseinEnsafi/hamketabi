"use client"
import { FeedType } from "@/lib/types"
import { MessageCircleIcon } from "lucide-react"
import Link from "next/link"

interface CommentButtonProps {
  commentsCount: number
  feedId: string
  feedType: FeedType
}

const CommentButton = ({ feedId, feedType, commentsCount }: CommentButtonProps) => {
  return (
    <div>
      <Link href={`/${feedType.toLowerCase()}s/${feedId}`}>
        <button type="submit" className="outline-action-btn">
          <MessageCircleIcon />
          <span className="text-sm leading-[0]" aria-label="تعداد کامنت">
            {commentsCount}
          </span>
        </button>
      </Link>
    </div>
  )
}
export default CommentButton
