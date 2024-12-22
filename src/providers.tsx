"use client"
import { DirectionProvider } from "@radix-ui/react-direction"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { Toaster } from "@/components/ui/sonner"
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <DirectionProvider dir="rtl">{children}</DirectionProvider>
      <Toaster />
    </ThemeProvider>
  )
}
