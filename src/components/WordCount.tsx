import { cn } from "@/lib/utils"

interface WordCountProps {
  currentLength: number
  minLength: number
  maxLength: number
  isDirty: boolean
}

const WordCount = ({ currentLength, minLength, maxLength, isDirty }: WordCountProps) => {
  const isInvalid = (currentLength < minLength || currentLength > maxLength) && isDirty

  return (
    <span className={cn("text-sm", isInvalid && "text-destructive")}>
      {currentLength}/{maxLength}
    </span>
  )
}

export default WordCount
