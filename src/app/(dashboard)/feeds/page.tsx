import Feeds from "@/components/Feeds"
import { fetchFeedsPosts } from "@/data/post"
import { fetchFeedReviews } from "@/data/review"
import { Suspense } from "react"

const FeedsPage = async () => {
  const posts = await fetchFeedsPosts()
  const reviews = await fetchFeedReviews()

  const combinedFeeds = [...posts.map((post) => ({ ...post })), ...reviews.map((review) => ({ ...review }))]

  const sortedFeeds = combinedFeeds.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return (
    <>
      <Suspense fallback={<></>}>
        <Feeds feeds={sortedFeeds} />
      </Suspense>
    </>
  )
}

export default FeedsPage
