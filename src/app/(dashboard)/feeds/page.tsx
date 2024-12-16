import Feeds from "@/components/Feeds"
import { fetchFeedsPosts } from "@/data/post"
import { Suspense } from "react"

const FeedsPage = async () => {
  const feeds = await fetchFeedsPosts()
  return (
    <>
      <Suspense fallback={<></>}>
        <Feeds feeds={feeds} />
      </Suspense>
    </>
  )
}
export default FeedsPage
