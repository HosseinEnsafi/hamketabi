import { Loader2, LucideIcon } from "lucide-react"

import { Button, ButtonProps } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

type SubmitBtnProps = ButtonProps & {
  children: React.ReactNode
  Icon?: LucideIcon // Accept a React component for the icon
}

export default function SubmitBtn({ children, Icon, ...props }: SubmitBtnProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" {...props}>
      {children}
      {pending && <Loader2 className="animate-spin" />}
      {Icon && !pending && <Icon />}
    </Button>
  )
}
