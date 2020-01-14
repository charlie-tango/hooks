import { useState, useEffect } from 'react'
import useClientHydrated from '@charlietango/use-client-hydrated'
import json2mq, { QueryObject } from 'json2mq'

function getMediaQuery(query: string | QueryObject) {
  return window.matchMedia(typeof query === 'string' ? query : json2mq(query))
}

export default function useMedia(
  query: string | QueryObject,
  defaultMatches = true,
) {
  const clientHydrated = useClientHydrated()
  const [matches, setMatches] = useState(() => {
    const initialQuery = clientHydrated ? getMediaQuery(query) : undefined
    return initialQuery ? initialQuery.matches : defaultMatches
  })

  useEffect(() => {
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
