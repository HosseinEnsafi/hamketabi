"use client"
import { ReviewWithExtras } from "@/lib/types"
import { useState } from "react"
import Modal from "./Modal"
import { MoreVertical, SendIcon } from "lucide-react"
import { Button } from "./ui/button"

const TriggerOption = ({ onClick }: { onClick: () => void }) => (
  <MoreVertical
    onClick={onClick}
    className="size-6 cursor-pointer rounded-full p-1 hover:bg-accent hover:text-accent-foreground"
  />
)

const ReviewOptions = ({ review, userId }: { review: ReviewWithExtras; userId: string }) => {
  const [open, setOpen] = useState(false)
  const isMine = review.user.id === userId

  const modalTitle = "عملیات ممربوط به یادداشت"
  const modalDesc = "از بین گزینه های انتخاب کنید"

  return (
    <>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={modalTitle}
        description={modalDesc}
        trigger={<TriggerOption onClick={() => setOpen(true)} />}
      >
        <div className="divide-y divide-neutral-500/20">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}`)
              setOpen(false)
            }}
            variant="secondary"
            className="modal-item"
          >
            اشتراک گذاری
            <SendIcon />
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}`)
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
    </>
  )
}
export default ReviewOptions
