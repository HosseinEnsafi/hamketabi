import { FeedItem } from "@/lib/types"
import { User } from "next-auth"

interface FeedActionsProps<T extends FeedItem> {
  user: User
  feed: T
}

const FeedActions = <T extends FeedItem>({ user, feed }: FeedActionsProps<T>) => {
  return <div>FeedAction</div>
}

export default FeedActions
