import { fetchFeedsPosts } from "./post"

export const getFeed = async () => {
  const posts = await fetchFeedsPosts()
  return posts
}
