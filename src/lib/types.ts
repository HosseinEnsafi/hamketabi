import type { Comment, Like, Post, SavedItem, User } from "@prisma/client"
export type ActionResponse =
  | { error: string; success?: undefined }
  | { success: string; error?: undefined }

export type FeedType = "POST" | "BOOKLIST" | "QUOTE" | "REVIEW"

export type safeUser = Omit<User, "password">

export type FeedItem = {
  type: FeedType
  user: safeUser
  hasLiked: boolean
  hasSaved: boolean
  _count: {
    likes: number
    savedBy: number
    comments: number
  }
}

export type PostFeedItem = FeedItem &
  Post & {
    type: "POST"
  }

export type CommentWithExtras = Comment & { user: User }
export type LikeWithExtras = Like & { user: User }

export type PostWithExtras = Post & {
  comments: CommentWithExtras[]
  likes: LikeWithExtras[]
  savedBy: SavedItem[]
  user: safeUser
}

export type UnifiedFeedItem = PostFeedItem
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
  saved: SavedItem[]
  /*   followedBy: FollowerWithExtras[]
  following: FollowingWithExtras[] */
}
