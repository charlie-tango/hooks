import { useRef } from 'react'

function useLazyRef<T>(init: () => T): T {
  const value = useRef<T | undefined>()
  if (!value.current) value.current = init()
  return value.current
}

export default useLazyRef
