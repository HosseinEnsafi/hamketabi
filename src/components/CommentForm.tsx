"use client"
import { SendIcon } from "lucide-react"
import { Button } from "./ui/button"
import { CreateComment } from "@/actions/comment"
import { toast } from "sonner"

const CommentForm = ({ feedId }: { feedId: string }) => {
  return (
    <div className="rounded bg-muted p-2">
      <form
        action={async (formData) => {
          console.log(formData.entries())
          const body = formData.get("body")!.toString()
          const feedId = formData.get("feedId")!.toString()
          const res = await CreateComment({ body, feedId }, "POST")
          if (res && "error" in res) toast.error(res.error)
        }}
      >
        <input type="hidden" name="feedId" value={feedId} />
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
