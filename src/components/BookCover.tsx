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
    <div className="relative h-72 w-48 overflow-hidden rounded-md">
      <Image src={src} alt={alt} fill className={cn("object-cover", className)} {...props} />
    </div>
  )
}
export default BookCover
