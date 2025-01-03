import FollowButton from "@/components/FollowButton"
import { Button, buttonVariants } from "@/components/ui/button"
import UserAvatar from "@/components/UserAvatar"
import { getUserId } from "@/data/auth"
import { fetchProfile } from "@/data/user"
import { MoreHorizontal, Settings } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  params: Promise<{ username: string }>
}

export default async function ProfileLayout({ children, params }: Props) {
  const username = (await params).username
  const profile = await fetchProfile(username)
  const userId = await getUserId()
  if (!profile) notFound()

  const isCurrentUser = userId === profile.id

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="flex gap-x-5 px-4">
          <UserAvatar image={profile.image} />

          <div className="space-y-4 md:px-10">
            <div className="grid grid-cols-2 items-center gap-3">
              <p className="justify-self-start text-xl font-semibold">{profile.name}</p>

              {isCurrentUser ? (
                <>
                  <Button size={"icon"} variant={"ghost"}>
                    <Settings />
                  </Button>
                  <Button asChild className={"!font-bold"} variant={"secondary"} size={"sm"}>
                    <Link href={`edit`}>ویرایش پروفایل</Link>
                  </Button>
                  <Button variant={"secondary"} className="font-bold" size={"sm"}>
                    مشاهده آرشیو
                  </Button>
                </>
              ) : (
                <>
                  <Button size={"icon"} variant={"ghost"}>
                    <MoreHorizontal />
                  </Button>

                  <FollowButton followingId={profile.id} followedBy={profile.followedBy} userId={userId} />

                  <Button variant={"secondary"} className="font-bold" size={"sm"}>
                    ارسال پیام
                  </Button>
                </>
              )}
            </div>

            <div className="!my-4 flex items-center gap-x-7">
              <p className="font-medium">
                <strong>{profile.posts.length} پست</strong>
              </p>

              <Link href={`${profile.name}/followers`} className="font-medium">
                <strong>{profile.followedBy.length}</strong> دنبال‌کننده
              </Link>

              <Link href={`${profile.name}/following`} className="font-medium">
                <strong>{profile.following.length}</strong> دنبال‌شونده
              </Link>
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  )
}
