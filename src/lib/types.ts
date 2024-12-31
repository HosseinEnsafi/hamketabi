import type {
  Author,
  Book,
  BookAuthor,
  BookList,
  BookPublisher,
  Category,
  Comment,
  Like,
  Post,
  Publisher,
  Quote,
  Review,
  Saved,
  User,
} from "@prisma/client"
export type ActionResponse =
  | { error: string; success?: undefined }
  | { success: string; error?: undefined }

export type FeedType = "POST" | "BOOKLIST" | "QUOTE" | "REVIEW"

export type SafeUser = Omit<User, "password">
export type UserInfo = Pick<SafeUser, "name" | "image" | "id">

export type FeedItem = {
  type: FeedType
  user: UserInfo
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

export type CommentWithExtras = Comment & { user: UserInfo; likes: Like[] }
export type LikeWithExtras = Like & { user: UserInfo }
export type SavedWithExtras = Saved & { user: UserInfo }

export type PostWithExtras = Post & {
  user: SafeUser
  comments: CommentWithExtras[]
  likes: LikeWithExtras[]
  savedBy: SavedWithExtras[]
}

export type ReviewWithExtras = Review & {
  user: UserInfo
  book: Book
}

export type BookWithExtras = Book & {
  // likes: LikeWithExtras[]
  // savedBy: SavedWithExtras[]
  authors: (BookAuthor & { author: Author })[]
  publishers: (BookPublisher & { publisher: Publisher })[]
  reviews: ReviewWithExtras[]
  category: Category
  bookList: BookList[]
}

export type UnifiedFeedItem = PostFeedItem | QuoteFeedItem
/*   | BooklistFeedItem
  | QuoteFeedItem
  | ReviewFeedItem */

/* export type UserWithFollows = SafeUser & {
  following: Follows[]
  followedBy: Follows[]
} */
/* 
export type FollowerWithExtras = Follows & { follower: UserWithFollows }
export type FollowingWithExtras = Follows & { following: UserWithFollows }
 */
export type UserWithExtras = SafeUser & {
  posts: Post[]
  saved: Saved[]
  /*   followedBy: FollowerWithExtras[]
  following: FollowingWithExtras[] */
}

export type OptimisticReview = {
  userId: string
  rating: number
}
