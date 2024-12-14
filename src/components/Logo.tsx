import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "./ui/button"

const Logo = ({ to, className }: { to?: string; className?: string }) => {
  return (
    <Button asChild variant={"ghost"}>
      <Link href={to || "/"} className={cn("text-lg font-semibold", className)}>
        لوگو اصلی
      </Link>
    </Button>
  )
}
export default Logo
