import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
const FeedsPage = async () => {
  const session = await auth()

  return (
    <main>
      <pre>{JSON.stringify(session)}</pre>
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/auth/login" })
        }}
      >
        <Button type="submit" variant={"default"} className="mr-2">
          خروج
        </Button>
      </form>
    </main>
  )
}
export default FeedsPage
