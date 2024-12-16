"use client"
import dayjs from "dayjs"
import jalaliday from "jalaliday"
import relativeTime from "dayjs/plugin/relativeTime"
import { cn } from "@/lib/utils"

dayjs.extend(jalaliday)
dayjs.extend(relativeTime)
dayjs.locale("fa")

const TimeAgo = ({ date, className }: { date: Date | string; className?: string }) => {
  const formattedDate = dayjs(date).calendar("jalali")
  if (!formattedDate.isValid()) {
    return <time>تاریخ نامعتبر </time>
  }

  return <time className={cn("text-[10px]", className)}>{formattedDate.fromNow()}</time>
}

export default TimeAgo
