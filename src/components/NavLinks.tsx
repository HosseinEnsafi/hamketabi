"use client"
import { BookmarkIcon, Compass, HomeIcon, PlusSquare } from "lucide-react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

const links = [
  { name: "صفحه اصلی", href: "/feeds", icon: HomeIcon },
  { name: "گشت و گذار", href: "/explore", icon: Compass },
  { name: "ایجاد", href: "/create", icon: PlusSquare },
  {
    name: "نشان شده ها",
    href: "/profile/saved",
    hideOnMobile: true,
    icon: BookmarkIcon,
  },
]
const NavLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {links.map((link, i) => {
        const LinkIcon = link.icon
        const isActive = pathname === link.href
        return (
          <Button
            key={i}
            asChild
            variant={"ghost"}
            size={"lg"}
            className={cn(
              "w-full space-x-2 px-5 sm:px-4 md:justify-center lg:justify-start [&_svg]:size-5",
              {
                "hidden justify-start md:flex": link.hideOnMobile,
              },
            )}
          >
            <Link href={link.href} className={cn({ "text-primary": isActive })}>
              <LinkIcon />
              <p
                className={cn("hidden lg:block", {
                  "font-extrabold": isActive,
                })}
              >
                {link.name}
              </p>
            </Link>
          </Button>
        )
      })}
    </>
  )
}
export default NavLinks
