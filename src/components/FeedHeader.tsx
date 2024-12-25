import UserAvatar from "./UserAvatar"
import TimeAgo from "./TimeAgo"
import { User } from "next-auth"
import Time from "./Time"
import Link from "next/link"

interface FeedHeaderProps {
  user: User
  username: string
  date: Date
  description?: string
  timeFormat?: "relative" | "absolute"
}

const FeedHeader = ({ user, username, date, description, timeFormat = "absolute" }: FeedHeaderProps) => {
  return (
    <div className="flex items-center gap-x-3">
      <Link href={`profile/${username}`}>
        <UserAvatar image={user.image} />
      </Link>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2">
          <Link href={`profile/${username}`}>
            <p className="font-semibold">{username}</p>
          </Link>
          {description && <p className="font-light text-muted-foreground">{description}</p>}
        </div>
        {timeFormat === "relative" ? <TimeAgo date={date} /> : <Time date={date} />}
      </div>
    </div>
  )
}

export default FeedHeader
