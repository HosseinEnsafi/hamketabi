"use client"
import { UnifiedFeedItem } from "@/lib/types"
import { MessageCircleIcon } from "lucide-react"
import Link from "next/link"

interface CommentButtonProps {
  feed: UnifiedFeedItem
}

const CommentButton = ({ feed }: CommentButtonProps) => {
  return (
    <div>
      <input type="hidden" name="feedId" value={feed.id} />
      <input type="hidden" name="type" value={feed.type} />
      <Link href={`${feed.type.toLowerCase()}s/${feed.id}`}>
        <button type="submit" className="outline-action-btn">
          <MessageCircleIcon />
          <span>{feed._count.comments}</span>
        </button>
      </Link>
    </div>
  )
}
export default CommentButton
