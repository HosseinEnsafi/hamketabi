import Image from "next/image"

type UserAvatarProps = {
  image: string | null | undefined
}

export default function UserAvatar({ image }: UserAvatarProps) {
  return (
    <div className="relative size-9 overflow-hidden rounded-full">
      <Image src={image ?? "/images/default_avatar_profile.png"} alt="avatar profile" width={36} height={36} />
    </div>
  )
}
