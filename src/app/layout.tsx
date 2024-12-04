import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Providers from "@/providers"

const IRANSansX = localFont({
  src: [
    {
      path: "./fonts/IRANSansX_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/IRANSansX_DemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/IRANSansX_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IRANSansX_Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
})
/* const IRANSansXFaNum = localFont({
  src: [
    {
      path: "./fonts/IRANSansXFaNum_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/IRANSansXFaNum_DemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/IRANSansXFaNum_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IRANSansXFaNum_Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
})
 */
export const metadata: Metadata = {
  title: "هم کتابی",
  description: "شبکه اجتماعی جامع کتاب دوستان",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <Providers>
        <body className={`${IRANSansX.className}  antialiased`}>{children}</body>
      </Providers>
    </html>
  )
}
