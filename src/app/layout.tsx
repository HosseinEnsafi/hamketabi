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
    <html lang="fa" dir="rtl">
      <Providers>
        <body className={`${IRANSansXFaNum.className} antialiased`}>{children}</body>
      </Providers>
    </html>
  )
}
