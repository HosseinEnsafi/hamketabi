"use client"
import { UnifiedFeedItem } from "@/lib/types"
import { MoreVertical, SendIcon, Trash2 } from "lucide-react"
import { useState } from "react"
import SubmitBtn from "./SubmitBtn"
import { deleteFeedItem } from "@/actions/feed"
import { Button } from "./ui/button"
import Modal from "./Modal"

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

const FeedOptions = ({ userId, feed }: FeedOptionsProps) => {
  const [open, setOpen] = useState(false)
  const isMine = feed.user.id === userId

  const modalTitle = "عملیات ممربوط به پست"
  const modalDesc = "از بین گزینه های انتخاب کنید"

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title={modalTitle}
      description={modalDesc}
      trigger={<TriggerOption onClick={() => setOpen(true)} />}
    >
      <div className="divide-y divide-neutral-500/20">
        {isMine && (
          <form
            action={async (formData) => {
              const feedId = formData.get("feedId")!.toString()
              const type = formData.get("type")!.toString()
              await deleteFeedItem({ feedId, type })
            }}
          >
            <input type="hidden" name="feedId" value={feed.id} />
            <input type="hidden" name="type" value={feed.type} />
            <SubmitBtn Icon={Trash2} className="modal-item text-destructive" variant="secondary">
              حذف
            </SubmitBtn>
          </form>
        )}

        <Button
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/${feed.type.toLowerCase()}s/${feed.id}`)
            setOpen(false)
          }}
          variant="secondary"
          className="modal-item"
        >
          اشتراک گذاری
          <SendIcon />
        </Button>
      </div>
    </Modal>
  )
}

export default FeedOptions
