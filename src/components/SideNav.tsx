import { auth } from "@/auth"
import NavLinks from "./NavLinks"
import Logo from "./Logo"
import ProfileLink from "./ProfileLink"
import MoreOptions from "./MoreOptions"
import CreateLink from "./CreateLink"

const SideNav = async () => {
  const session = await auth()
  const user = session?.user
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-14 flex-row items-center justify-between gap-1 border-t bg-background p-3 md:relative md:h-full md:flex-col md:justify-between md:gap-3 md:border-l md:border-t-0 md:px-2 md:pb-4">
      <Logo className="mb-12 hidden md:block" to="/feeds" />
      <NavLinks />
      {user && <ProfileLink user={user} />}
      <CreateLink />
      <MoreOptions />
    </nav>
  )
}
export default SideNav
