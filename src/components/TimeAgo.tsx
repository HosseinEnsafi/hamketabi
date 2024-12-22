"use client"

import { cn } from "@/lib/utils"
const timeStyles = "text-[10px] text-muted-foreground"

const TimeAgo = ({ date, className }: { date: Date | string; className?: string }) => {
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return <time className={cn(timeStyles, className)}>تاریخ نامعتبر</time>
  }

  const now = new Date()
  const diffMs = parsedDate.getTime() - now.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)

  const formatter = new Intl.RelativeTimeFormat(["fa", "en"], { numeric: "auto" })

  let relativeTime: string

  if (Math.abs(diffSeconds) < 60) {
    relativeTime = formatter.format(diffSeconds, "second")
  } else if (Math.abs(diffSeconds) < 3600) {
    relativeTime = formatter.format(Math.floor(diffSeconds / 60), "minute")
  } else if (Math.abs(diffSeconds) < 86400) {
    relativeTime = formatter.format(Math.floor(diffSeconds / 3600), "hour")
  } else if (Math.abs(diffSeconds) < 2592000) {
    relativeTime = formatter.format(Math.floor(diffSeconds / 86400), "day")
  } else if (Math.abs(diffSeconds) < 31536000) {
    relativeTime = formatter.format(Math.floor(diffSeconds / 2592000), "month")
  } else {
    relativeTime = formatter.format(Math.floor(diffSeconds / 31536000), "year")
  }

  return <time className={cn(timeStyles, className)}>{relativeTime}</time>
}

export default TimeAgo
