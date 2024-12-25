"use client"
import { PostWithExtras } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { useRouter } from "next/navigation"
import { DialogDescription } from "@radix-ui/react-dialog"

interface PostViewProps {
  post: PostWithExtras
}

const PostView = ({ post }: PostViewProps) => {
  const router = useRouter()
  return (
    <Dialog open={true} onOpenChange={(open) => !open && router.back()}>
      <DialogContent icon={false} className="">
        <DialogHeader className="sr-only">
          <DialogDescription>
            {post.user.name} پستی در {new Date(post.createdAt).toLocaleString()} منتشر کرده است
          </DialogDescription>
          <DialogTitle>
            {post.user.name} پستی در {new Date(post.createdAt).toLocaleString()} منتشر کرده است
          </DialogTitle>
        </DialogHeader>

        <h1>Hello</h1>
      </DialogContent>
    </Dialog>
  )
}
export default PostView
