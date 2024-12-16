import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

const SearchBook = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("relative w-full min-w-60 rounded-md md:w-full", className)}
      {...props}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="text-gray-500" size={18} />
      </div>

      <Input
        type="text"
        className="w-full rounded-md border p-2.5 pl-10 text-sm"
        placeholder="از بین هزاران کتاب انتخاب کنید"
      />
    </div>
  )
}

export default SearchBook
