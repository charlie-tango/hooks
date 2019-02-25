import { useState, useEffect } from 'react'
import json2mq, { QueryObject } from 'json2mq'

export function useMedia(query: string | QueryObject, defaultMatches = true) {
  const [matches, setMatches] = useState(defaultMatches)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      typeof query === 'string' ? query : json2mq(query),
    )

    setMatches(mediaQuery.matches)

    const listener = () => {
      if (mediaQuery.matches !== matches) {
        setMatches(mediaQuery.matches)
      }
    }

    mediaQuery.addListener(listener)

    return () => {
      mediaQuery.removeListener(listener)
    }
  }, [query])

  return matches
}
