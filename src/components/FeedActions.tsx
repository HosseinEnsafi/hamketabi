import { FeedType, UnifiedFeedItem } from "@/lib/types"
import LikeButton from "./LikeFeed"
import CommentButton from "./CommentButton"
import ShareFeedItemButton from "./ShareFeedItemButton"
import BookMarkButton from "./BookmarkFeed"
import { CommentAbleType, LikeableType } from "@prisma/client"

interface FeedActionsProps {
  feed: UnifiedFeedItem
  userId: string
  type: Extract<Extract<FeedType, CommentAbleType>, LikeableType>
}

const FeedActions = ({ feed, userId, type }: FeedActionsProps) => {
  return (
    <div className="flex flex-row-reverse items-center justify-between px-3">
      <div className="flex flex-row-reverse items-center gap-2">
        <LikeButton likeableType={type} likeableId={feed.id} likes={feed.likes} userId={userId} />
        <CommentButton commentsCount={feed._count.comments} feedId={feed.id} feedType={type} />
        <ShareFeedItemButton feedId={feed.id} feedType={type} />
      </div>

      <BookMarkButton saveableType={type} saveableId={feed.id} savedBy={feed.savedBy} userId={userId} />
    </div>
  )
}
export default FeedActions
