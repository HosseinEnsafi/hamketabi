"use client"
import { FollowerWithExtras } from "@/lib/types"
import { Button } from "./ui/button"
import { useOptimistic } from "react"
import { followUser } from "@/actions/follow"

interface Props {
  followedBy: FollowerWithExtras[]
  userId: string
  followingId: string
}

const FollowButton = ({ followedBy, userId, followingId }: Props) => {
  const predicate = (follow: FollowerWithExtras) => follow.followerId === userId

  const [optimisticFollows, toggleOptimisticFollows] = useOptimistic(followedBy, (follows, newFollow) =>
    // @ts-expect-error only need userId for evaluation
    follows.some(predicate) ? follows.filter((follow) => follow.followerId !== userId) : [...follows, newFollow],
  )

  console.log(optimisticFollows)

  return (
    <form
      action={async () => {
        toggleOptimisticFollows({ followerId: userId })
        await followUser({ id: followingId })
      }}
    >
      <Button type="submit" size={"sm"} variant={"secondary"} className="font-bold">
        {optimisticFollows.some(predicate) ? "دنبال میکنید" : "دنبال‌کن"}
      </Button>
    </form>
  )
}

export default FollowButton
