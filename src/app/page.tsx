import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!!session) redirect("/feeds")

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="grid grid-cols-2 grid-rows-2 items-center gap-x-36 gap-y-4 py-4 md:grid-cols-[auto,1fr,auto] md:grid-rows-1">
        <h1 className="">لوگو اصلی</h1>
        <div className="relative col-span-2 col-start-1 flex w-full items-center md:col-span-1">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <SearchIcon className="text-gray-500" size={14} />
          </div>
          <Input
            type="search"
            className="w-full max-w-2xl rounded-lg border bg-gray-100 p-2.5 ps-10 text-sm"
            placeholder="از بین هزاران کتاب انتخاب کنید"
          />
        </div>
        <nav className="col-start-2 row-start-1 flex gap-2 justify-self-end md:col-start-3">
          <Button asChild>
            <Link href={"/auth/login"}>ورود</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={"/auth/login"}>ثبت نام</Link>
          </Button>
        </nav>
      </header>

      <main>
        <section>{}</section>
      </main>
    </div>
  )
}
