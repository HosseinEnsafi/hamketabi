"use client"

import { PostFeedItem, UnifiedFeedItem } from "@/lib/types"
import { MoreVertical, SendIcon, Trash2 } from "lucide-react"
import { useMediaQuery } from "@/lib/hook"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react"
import SubmitBtn from "./SubmitBtn"
import { deleteFeedItem } from "@/actions/feed"
import { Button } from "./ui/button"

interface FeedOptionsProps {
  userId: string
  feed: UnifiedFeedItem
}

const TriggerOption = ({ onClick }: { onClick: () => void }) => (
  <MoreVertical
    onClick={onClick}
    className="size-6 cursor-pointer rounded-full p-1 hover:bg-accent hover:text-accent-foreground"
  />
)

const FeedOptionsContent = ({
  feed,
  isMine,
  onClose,
}: {
  feed: UnifiedFeedItem
  isMine: boolean
  onClose: () => void
}) => (
  <div className="divide-y divide-neutral-500/20">
    {isMine && (
      <>
        <form
          action={async (formData) => {
            const feedId = formData.get("feedId")!.toString()
            const type = formData.get("type")!.toString()
            console.log(type)
            await deleteFeedItem({ feedId, type })
          }}
        >
          <input type="hidden" name="feedId" value={feed.id} />
          <input type="hidden" name="type" value={feed.type} />
          <SubmitBtn Icon={Trash2} className="modal-item text-destructive" variant="secondary">
            حذف پست
          </SubmitBtn>
        </form>
      </>
    )}

    <Button
      onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}/${feed.type.toLowerCase()}s/${feed.id}`)
        onClose()
      }}
      variant="secondary"
      className="modal-item"
    >
      اشتراک گذاری
      <SendIcon />
    </Button>
  </div>
)

const FeedOptions = ({ userId, feed }: FeedOptionsProps) => {
  const isMine = feed.user.id === userId
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [open, setOpen] = useState(false)
  const modalTitle = "عملیات ممربوط به پست"
  const modalDesc = "از بین گزینه های انتخاب کنید"

  const CommonContent = <FeedOptionsContent onClose={() => setOpen(false)} feed={feed} isMine={isMine} />

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TriggerOption onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent icon={false} className="modal-content sm:max-w-sm">
        <DialogHeader className="sr-only">
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDesc}</DialogDescription>
        </DialogHeader>
        {CommonContent}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <TriggerOption onClick={() => setOpen(true)} />
      </DrawerTrigger>
      <DrawerContent icon={false} className="modal-content">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{modalTitle}</DrawerTitle>
          <DrawerDescription>{modalDesc}</DrawerDescription>
        </DrawerHeader>
        {CommonContent}
      </DrawerContent>
    </Drawer>
  )
}

export default FeedOptions
