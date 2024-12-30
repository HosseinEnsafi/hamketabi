import { UploadDropzone } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"

interface UploadBookImageDDProps {
  onUploadCompleted?: (url: string) => void
  onUploadError?: (error: Error) => void
}

const UploadBookImageDD = ({ onUploadCompleted, onUploadError }: UploadBookImageDDProps) => {
  return (
    <UploadDropzone
      endpoint={"bookImage"}
      appearance={{
        container: ({ isDragActive }) =>
          cn(
            "border-2 border bg-muted cursor-pointer text-primary text-center py-2 px-4 rounded-md transition-colors duration-200 ease-in-out",
            isDragActive ? "border-dashed border-primary bg-primary/20" : "border-solid border-muted",
          ),
        button: "after:bg-transparent bg-primary/90 focus-within:ring-primary/60",
        label: "text-muted-foreground hover:text-muted-foreground",
        allowedContent: "text-muted-foreground",
      }}
      content={{
        allowedContent: "حداکثر 4 مگابایت",
        button({ isDragActive, isUploading, uploadProgress, files }) {
          if (isUploading) return `در حال آپلود: ${uploadProgress > 100 ? 100 : uploadProgress}%`
          if (isDragActive) return "برای آپلود رها کنید"
          return files[0] ? "آپلود" : "انتخاب عکس"
        },
        label: "عکس را انتخاب کنید یا بکشید و رها کنید",
      }}
      config={{ cn: cn }}
      onClientUploadComplete={(res) => onUploadCompleted?.(res[0].url)}
      onUploadError={(error: Error) => onUploadError?.(error)}
    />
  )
}

export default UploadBookImageDD
