import { fetchFeedsPosts } from "./post"

export const getFeed = async () => {
  // TODO later fetching reviews and quotes too
  const posts = await fetchFeedsPosts()
  return posts
}
