import { useState, useEffect } from 'react'

type ViewportSize = {
  height: number
  width: number
}

let clientHydrated = false

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<ViewportSize>({
    width: clientHydrated ? window.innerWidth : 0,
    height: clientHydrated ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleSize()
    if (!clientHydrated) clientHydrated = true
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
