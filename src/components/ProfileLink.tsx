"use client"
import type { User } from "next-auth"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { UserCircle } from "lucide-react"

const ProfileLink = ({ user }: { user: User }) => {
  const pathname = usePathname()
  const href = `/profile/${user.name}`
  const isActive = pathname === href
  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      size={"lg"}
      className={cn(
        "w-full space-x-2 px-5 sm:px-4 md:justify-center lg:justify-start [&_svg]:size-5",
        { "font-semibold text-primary": isActive },
      )}
    >
      <Link href={href} className={cn({ "text-primary": isActive })}>
        <UserCircle className="w-6" />
        <p className={cn("hidden lg:block")}>پروفایل</p>
      </Link>
    </Button>
  )
}
export default ProfileLink
