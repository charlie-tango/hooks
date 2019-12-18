import { useState, useEffect } from 'react'
import json2mq, { QueryObject } from 'json2mq'

let clientHydrated = false

function getMediaQuery(query: string | QueryObject) {
  if (clientHydrated) {
    return window.matchMedia(typeof query === 'string' ? query : json2mq(query))
  }

  return undefined
}

export default function useMedia(
  query: string | QueryObject,
  defaultMatches = true,
) {
  const [matches, setMatches] = useState(() => {
    const initialQuery = getMediaQuery(query)
    return initialQuery ? initialQuery.matches : defaultMatches
  })

  useEffect(() => {
    if (!clientHydrated) clientHydrated = true
    const mediaQuery = getMediaQuery(query)
    if (!mediaQuery) return undefined

    setMatches(mediaQuery.matches)

    const listener = () => setMatches(mediaQuery.matches)
    mediaQuery.addListener(listener)

    return () => {
      mediaQuery.removeListener(listener)
    }
  }, [query])

  return matches
}
