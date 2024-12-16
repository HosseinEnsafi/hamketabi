import { UploadButton } from "@/lib/uploadthing"
import { twMerge } from "tailwind-merge"

type UploadImagePostBtnProps = {
  onUploadCompleted?: (url: string) => void
  onUploadError?: (error: Error) => void
}

const UploadImagePostBtn = ({
  onUploadCompleted,
  onUploadError,
}: UploadImagePostBtnProps) => {
  return (
    <UploadButton
      appearance={{
        button: "bg-primary after:bg-transparent focus-within:ring-primary/60",
      }}
      content={{
        allowedContent: "حداکثر 4 مگابایت",
        button({ ready, isUploading, uploadProgress }) {
          if (isUploading) return `${uploadProgress}%`
          if (ready && !isUploading) return "انتخاب عکس"
        },
      }}
      config={{ cn: twMerge }}
      endpoint={"imageUploader"}
      onClientUploadComplete={(res) => onUploadCompleted?.(res[0].url)}
      onUploadError={(error: Error) => onUploadError?.(error)}
    />
  )
}

export default UploadImagePostBtn
