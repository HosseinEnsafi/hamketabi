import { UnifiedFeedItem } from "@/lib/types"
import LikeButton from "./LikeButton"
import CommentButton from "./CommentButton"
import ShareFeedItemButton from "./ShareFeedItemButton"
import BookMarkButton from "./BookMarkButton"

interface FeedActionsProps {
  feed: UnifiedFeedItem
  userId: string
}

const FeedActions = ({ feed, userId }: FeedActionsProps) => {
  return (
    <div className="flex flex-row-reverse items-center justify-between px-3">
      <div className="flex flex-row-reverse items-center gap-2">
        <LikeButton feed={feed} userId={userId} />
        <CommentButton feed={feed} />
        <ShareFeedItemButton feed={feed} />
      </div>

      <BookMarkButton feed={feed} userId={userId} />
    </div>
  )
}
export default FeedActions
