import { cn } from "@/lib/utils"
import Image from "next/image"
import { ImageProps as NextImageProps } from "next/image"

interface BookCoverProps extends Omit<NextImageProps, "src"> {
  src: string
  alt: string
  className?: string
}

const BookCover = ({ className, src, alt, ...props }: BookCoverProps) => {
  return (
    <div className={cn("relative h-72 w-48 overflow-hidden rounded-md", className)}>
      <Image src={src} alt={alt} fill className={cn("object-cover")} {...props} />
    </div>
  )
}
export default BookCover
