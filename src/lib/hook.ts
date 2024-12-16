import { RefObject, useCallback, useEffect, useState, useSyncExternalStore } from "react"

export default function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
) {
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

    const updateMatches = () => setMatches(matchMedia.matches)

    updateMatches()
    matchMedia.addEventListener("change", updateMatches)

    return () => {
      matchMedia.removeEventListener("change", updateMatches)
    }
  }, [query])

  return matches
}
