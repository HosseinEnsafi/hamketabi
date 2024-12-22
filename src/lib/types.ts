import type { Comment, Like, Post, Quote, Saved, User } from "@prisma/client"
export type ActionResponse =
  | { error: string; success?: undefined }
  | { success: string; error?: undefined }

export type FeedType = "POST" | "BOOKLIST" | "QUOTE" | "REVIEW"

export type safeUser = Omit<User, "password">

export type FeedItem = {
  type: FeedType
  user: safeUser
  likes: Like[]
  savedBy: Saved[]
  _count: {
    comments: number
  }
}

export type PostFeedItem = FeedItem &
  Post & {
    type: Extract<FeedType, "POST">
  }

export type QuoteFeedItem = FeedItem &
  Quote & {
    type: Extract<FeedType, "QUOTE">
  }

export type CommentWithExtras = Comment & { user: User }
export type LikeWithExtras = Like & { user: User }

export type PostWithExtras = Post & {
  comments: CommentWithExtras[]
  likes: LikeWithExtras[]
  savedBy: Saved[]
  user: safeUser
}

export type UnifiedFeedItem = PostFeedItem | QuoteFeedItem
/*   | BooklistFeedItem
  | QuoteFeedItem
  | ReviewFeedItem */

/* export type UserWithFollows = safeUser & {
  following: Follows[]
  followedBy: Follows[]
} */
/* 
export type FollowerWithExtras = Follows & { follower: UserWithFollows }
export type FollowingWithExtras = Follows & { following: UserWithFollows }
 */
export type UserWithExtras = safeUser & {
  posts: Post[]
  saved: Saved[]
  /*   followedBy: FollowerWithExtras[]
  following: FollowingWithExtras[] */
}
