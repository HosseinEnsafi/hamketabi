import { Button, ButtonProps } from "@/components/ui/button"

type Props = Partial<ButtonProps> & {
  children: React.ReactNode
}

function ActionIcon({ children, ...buttonProps }: Props) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="size-9 rounded-full"
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

export default ActionIcon
