import { User } from "next-auth"
import Image from "next/image"

type UserAvatarProps = {
  user: User
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="relative size-8 overflow-hidden rounded-full">
      <Image
        src={user.image ?? "/images/default_avatar_profile.png"}
        alt="avatar profile"
        width={36}
        height={36}
      />
    </div>
  )
}
