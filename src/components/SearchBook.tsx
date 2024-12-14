import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

const SearchBook = ({ className }: { className: string }) => {
  return (
    <div className={cn("relative flex w-full items-center", className)}>
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
        <SearchIcon className="text-gray-500" size={14} />
      </div>
      <Input
        type="text"
        className="w-full max-w-2xl rounded-lg border p-2.5 ps-10 text-sm"
        placeholder="از بین هزاران کتاب انتخاب کنید"
      />
    </div>
  )
}
export default SearchBook
