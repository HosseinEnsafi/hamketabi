import SideNav from "@/components/SideNav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-20 flex-none md:border-r lg:w-52">
        <SideNav />
      </aside>
      <div className="mx-auto flex max-w-6xl flex-1 flex-col items-center">
        {children}
      </div>
    </div>
  )
}
