import { UnifiedFeedItem } from "@/lib/types"
import Post from "./Post"
import { Fragment } from "react"
import FeedReview from "./FeedReview"
import { getUserId } from "@/data/auth"

const Feeds = async ({ feeds }: { feeds: UnifiedFeedItem[] }) => {
  const userId = await getUserId()

  return (
    <>
      {feeds.map((feedItem) => {
        const FeedComponent =
          feedItem.type === "POST" ? (
            <Post post={feedItem} userId={userId} />
          ) : feedItem.type === "REVIEW" ? (
            <FeedReview review={feedItem} userId={userId} />
          ) : null
        return <Fragment key={feedItem.id}>{FeedComponent}</Fragment>
      })}
    </>
  )
}

export default Feeds
