"use client"
import { CommentWithExtras } from "@/lib/types"
import Link from "next/link"
import UserAvatar from "./UserAvatar"
import { useRef } from "react"
import TimeAgo from "./TimeAgo"
import { useSession } from "next-auth/react"

const Comment = ({ comment }: { comment: CommentWithExtras }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const href = `/profile/${comment.user.name}`
  const { data } = useSession()
  const user = data?.user

  if (!user) return

  return (
    <div className="flex items-start gap-3 p-3 px-3.5">
      <Link href={href}>
        <UserAvatar image={comment.user.image} />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-sm leading-none">
          <Link href={href} className="font-semibold">
            {comment.user.name}
          </Link>
          <p className="font-medium">{comment.body}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <TimeAgo date={comment.createdAt} />
          {/*  <button
            className="text-xs font-semibold text-neutral-500"
            onClick={() => inputRef?.current?.focus()}
          >
            Reply
          </button> */}
          {/* {comment.userId === session?.user.id && <CommentOptions comment={comment} />} */}
        </div>
      </div>
    </div>
  )
}

export default Comment
