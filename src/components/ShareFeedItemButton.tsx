"use client"
import { FeedType } from "@/lib/types"
import { Button } from "./ui/button"
import { SendIcon } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface CommentButtonProps {
  feedType: FeedType
  feedId: string
}

const ShareFeedItemButton = ({ feedId, feedType }: CommentButtonProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${feedType.toLowerCase()}s/${feedId}`)
    toast.success("لینک پست در حافظه موقت کپی شد")
  }

  return (
    <Button
      onClick={handleCopy}
      variant={"ghost"}
      className="flex rotate-12 justify-center rounded-full p-1 [&_svg]:size-5"
      size={"icon"}
    >
      <SendIcon className={cn("size-5")} />
    </Button>
  )
}
export default ShareFeedItemButton
