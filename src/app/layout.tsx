import type { Metadata } from "next"
import "./globals.css"
import Providers from "@/providers"
import { IRANSansXFaNum } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "هم کتابی | شبکه اجتماعی جامع کتاب دوستان ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="fa" dir="rtl">
      <body className={`${IRANSansXFaNum.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
