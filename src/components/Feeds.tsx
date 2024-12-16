import { UnifiedFeedItem } from "@/lib/types"
import Post from "./Post"
import { Fragment } from "react"

const Posts = ({ feeds }: { feeds: UnifiedFeedItem[] }) => {
  return (
    <>
      {feeds.map((feedItem) => {
        const FeedComponent = feedItem.type === "POST" ? <Post post={feedItem} /> : null
        return <Fragment key={feedItem.id}>{FeedComponent}</Fragment>
      })}
    </>
  )
}

export default Posts
