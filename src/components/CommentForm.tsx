"use client"
import { SendIcon } from "lucide-react"
import { Button } from "./ui/button"
import { createComment } from "@/actions/comment"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { CommentAbleType } from "@prisma/client"

const CommentForm = ({
  commentAbleId,
  className,
  commentAbleType = "POST",
}: {
  commentAbleId: string
  commentAbleType: CommentAbleType
  className?: string
}) => {
  return (
    <div className={cn("rounded bg-muted p-2", className)}>
      <form
        action={async (formData) => {
          const body = formData.get("body")!.toString()
          const res = await createComment({ body, commentAbleId, commentAbleType })
          if (res && "error" in res) toast.error(res.error)
        }}
      >
        <textarea
          placeholder="نظر خود را بنویسید..."
          className="scroll-none w-full resize-none bg-inherit text-base outline-none"
          name="body"
        ></textarea>

        <div className="flex items-center justify-between">
          <Button
            className="cursor-pointer rounded-full p-1 hover:bg-white/20"
            variant={"ghost"}
            size={"icon"}
            type="submit"
          >
            <SendIcon />
          </Button>
        </div>
      </form>
    </div>
  )
}
export default CommentForm
