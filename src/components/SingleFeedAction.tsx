import { FeedType, PostWithExtras } from "@/lib/types"
import LikeButton from "./LikeFeed"
import CommentButton from "./CommentButton"
import ShareFeedItemButton from "./ShareFeedItemButton"
import BookMarkButton from "./BookmarkFeed"
import { CommentAbleType, LikeableType } from "@prisma/client"

interface SingleFeedActionsProps {
  feed: PostWithExtras // | QuoteWithExtras
  userId: string
  type: Extract<Extract<FeedType, CommentAbleType>, LikeableType>
}

const SingleFeedActions = ({ feed, userId, type }: SingleFeedActionsProps) => {
  return (
    <div className="flex flex-row-reverse items-center justify-between px-3">
      <div className="flex flex-row-reverse items-center gap-2">
        <LikeButton likeableType={type} likeableId={feed.id} likes={feed.likes} userId={userId} />
        <CommentButton commentsCount={feed.comments.length} feedId={feed.id} feedType={type} />
        <ShareFeedItemButton feedId={feed.id} feedType={type} />
      </div>

      <BookMarkButton savedBy={feed.savedBy} saveableType={type} saveableId={feed.id} userId={userId} />
    </div>
  )
}
export default SingleFeedActions
