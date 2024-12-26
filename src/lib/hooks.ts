import { Like, Saved } from "@prisma/client"
import { RefObject, useEffect, useOptimistic, useState } from "react"

export default function useOutsideClick<T extends HTMLElement>(ref: RefObject<T>, handler: () => void) {
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref])
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const matchMedia = window.matchMedia(query)

    setMatches(matchMedia.matches)
    matchMedia.addEventListener("change", () => setMatches(matchMedia.matches))

    return () => {
      matchMedia.removeEventListener("change", () => setMatches(matchMedia.matches))
    }
  }, [query])

  return matches
}

export const useOptimisticLikes = (initialLikes: Like[], userId: string) => {
  const predicate = (like: Like) => like.userId === userId

  const [optimisticLikes, toggleOptimisticLike] = useOptimistic(initialLikes, (state, newLike) =>
    // @ts-expect-error only need userId for evaluation. others are not needed
    state.some(predicate) ? state.filter((like) => like.userId !== userId) : [...state, newLike],
  )

  return { optimisticLikes, toggleOptimisticLike, hasLiked: optimisticLikes.some(predicate) }
}

export const useOptimisticSaved = (initialSaved: Saved[], userId: string) => {
  const predicate = (saved: Saved) => saved.userId === userId

  const [optimisticSaved, toggleOptimisticSaved] = useOptimistic(initialSaved, (state, newSaved) =>
    // @ts-expect-error only need userId for evaluation. others are not needed
    state.some(predicate) ? state.filter((saved) => saved.userId !== userId) : [...state, newSaved],
  )

  return { optimisticSaved, toggleOptimisticSaved, hasSaved: optimisticSaved.some(predicate) }
}
