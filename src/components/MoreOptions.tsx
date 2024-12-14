"use client"

import {
  ChevronRight,
  InfoIcon,
  LogOutIcon,
  Menu,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  SunMoonIcon,
} from "lucide-react"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRef, useState } from "react"
import useOutsideClick from "@/lib/hook"
import { Switch } from "./ui/switch"
import { useTheme } from "next-themes"
import { logout } from "@/actions/auth"

const MoreOptions = () => {
  const [open, setOpen] = useState(false)
  const DropDownContentRef = useRef<HTMLDivElement>(null)
  const [showToggle, setShowToggle] = useState(false)
  const { theme, setTheme } = useTheme()
  useOutsideClick(DropDownContentRef, () => setOpen(false))

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          variant={"ghost"}
          size={"lg"}
          className="mt-auto w-full space-x-2 px-5 sm:px-4 md:justify-center lg:justify-start [&_svg]:size-5"
        >
          <Menu />
          <div className="hidden lg:block">بیشتر</div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent ref={DropDownContentRef}>
        {!showToggle && (
          <>
            <DropdownMenuItem className="cursor-pointer">
              <SettingsIcon />
              <DropdownMenuLabel>تنظیمات</DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <InfoIcon />
              <DropdownMenuLabel>راهنما</DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setShowToggle(true)}
            >
              <SunMoonIcon />
              <DropdownMenuLabel>حالت صفحه</DropdownMenuLabel>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <LogOutIcon />
              <DropdownMenuLabel onClick={logout}>خروج</DropdownMenuLabel>
            </DropdownMenuItem>
          </>
        )}
        {showToggle && (
          <>
            <div className="flex items-center gap-2 border-b p-2">
              <Button
                onClick={() => setShowToggle(false)}
                variant={"ghost"}
                className="size-8 rounded-full p-1"
              >
                <ChevronRight size={18} />
              </Button>
              <p>تغییر حالت</p>
              {theme === "dark" ? (
                <MoonIcon size={16} className="ms-auto" />
              ) : (
                <SunIcon size={16} className="ms-auto" />
              )}
            </div>

            <label
              htmlFor="dark-mode"
              className="flex cursor-pointer items-center justify-between gap-x-2 rounded-lg p-2"
            >
              حالت تاریک
              <Switch
                id="dark-mode"
                className="m-0"
                checked={theme === "dark"}
                onCheckedChange={(checked) => {
                  setTheme(checked ? "dark" : "light")
                }}
              />
            </label>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default MoreOptions
