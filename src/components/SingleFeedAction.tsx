import { FeedType, PostWithExtras } from "@/lib/types"
import LikeButton from "./LikeButton"
import CommentButton from "./CommentButton"
import ShareFeedItemButton from "./ShareFeedItemButton"
import BookMarkButton from "./BookMarkButton"

interface SingleFeedActionsProps {
  feed: PostWithExtras // | QuoteWithExtras
  userId: string
  type: FeedType
}

const SingleFeedActions = ({ feed, userId, type }: SingleFeedActionsProps) => {
  return (
    <div className="flex flex-row-reverse items-center justify-between px-3">
      <div className="flex flex-row-reverse items-center gap-2">
        <LikeButton feedType={type} feedId={feed.id} likes={feed.likes} userId={userId} />
        <CommentButton
          commentsCount={feed.comments.length}
          feedId={feed.id}
          userId={userId}
          feedType={type}
        />
        <ShareFeedItemButton feedId={feed.id} feedType={type} />
      </div>

      <BookMarkButton savedBy={feed.savedBy} feedType={type} feedId={feed.id} userId={userId} />
    </div>
  )
}
export default SingleFeedActions
