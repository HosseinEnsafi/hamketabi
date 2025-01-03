import { cn } from "@/lib/utils"

const Time = ({ date, className }: { date: Date; className?: string }) => {
  return (
    <time className={cn("text-xs text-muted-foreground", className)}>
      {new Date(date).toLocaleString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  )
}
export default Time
