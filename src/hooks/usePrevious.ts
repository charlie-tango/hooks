import { useEffect, useRef } from 'react'

/**
 * Use this hook to get a value from the previous hook update.
 */
export function usePrevious<T = any>(value: T): T {
  const ref = useRef<T>(value)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
