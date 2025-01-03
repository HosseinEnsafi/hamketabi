import { getUserId } from "./auth"

export const fetchSaved = async () => {
  const userId = await getUserId()
}
