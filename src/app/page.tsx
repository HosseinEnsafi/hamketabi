import { auth } from "@/auth"
import Logo from "@/components/Logo"
import SearchBook from "@/components/SearchBook"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!!session) redirect("/feeds")

  return (
    <div className="container mx-auto max-w-6xl px-2 lg:px-0">
      <header className="grid grid-cols-2 grid-rows-2 items-center gap-x-36 gap-y-4 py-4 md:grid-cols-[auto,1fr,auto] md:grid-rows-1">
        <Logo />
        <SearchBook className="col-span-2 col-start-1 md:col-span-1" />
        <nav className="col-start-2 row-start-1 flex gap-2 justify-self-end md:col-start-3">
          <Button asChild>
            <Link className="" href={"/auth/login"}>
              ورود
            </Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={"/auth/register"}>ثبت نام</Link>
          </Button>
        </nav>
      </header>

      <main>
        <section>{}</section>
      </main>
    </div>
  )
}
