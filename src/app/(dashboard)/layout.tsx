import SearchBook from "@/components/SearchBook"
import SideNav from "@/components/SideNav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row">
      <aside className="fixed inset-y-0 z-50 h-screen w-20 flex-none md:sticky md:border-r lg:w-52">
        <SideNav />
      </aside>
      <div className="-order-1 mx-auto mt-6 w-full max-w-md flex-1 !justify-center space-y-8 px-2 md:order-1 md:max-w-6xl">
        <header className="flex w-full justify-center">
          <SearchBook className="lg:3/4 md:w-2/3" />
        </header>
        <main className="mx-auto flex max-w-sm flex-col justify-center gap-12 px-4 pb-16 sm:max-w-lg sm:pb-4">
          {children}
        </main>
      </div>
    </div>
  )
}
