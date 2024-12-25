import { FeedType, UnifiedFeedItem } from "@/lib/types"
import LikeButton from "./LikeButton"
import CommentButton from "./CommentButton"
import ShareFeedItemButton from "./ShareFeedItemButton"
import BookMarkButton from "./BookMarkButton"

interface FeedActionsProps {
  feed: UnifiedFeedItem
  userId: string
  type: FeedType
}

const FeedActions = ({ feed, userId, type }: FeedActionsProps) => {
  return (
    <div className="flex flex-row-reverse items-center justify-between px-3">
      <div className="flex flex-row-reverse items-center gap-2">
        <LikeButton feedType={type} feedId={feed.id} likes={feed.likes} userId={userId} />
        <CommentButton
          commentsCount={feed._count.comments}
          feedId={feed.id}
          userId={userId}
          feedType={type}
        />
        <ShareFeedItemButton feedId={feed.id} feedType={type} />
      </div>

      <BookMarkButton feedType={type} feedId={feed.id} savedBy={feed.savedBy} userId={userId} />
    </div>
  )
}
export default FeedActions
