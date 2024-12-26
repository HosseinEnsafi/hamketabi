"use client"

import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/lib/hooks"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  trigger: ReactNode
  closeIcon?: boolean
}

const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
  closeIcon = false,
}: ModalProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const ModalContent = (
    <>
      {title && (
        <>
          {isDesktop ? (
            <DialogHeader className="sr-only">
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          ) : (
            <DrawerHeader className="sr-only">
              <DrawerTitle>{title}</DrawerTitle>
              {description && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>
          )}
        </>
      )}
      {children}
    </>
  )

  return isDesktop ? (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent icon={closeIcon} className="modal-content sm:max-w-sm">
        {ModalContent}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent icon={closeIcon} className="modal-content">
        {ModalContent}
      </DrawerContent>
    </Drawer>
  )
}

export default Modal
