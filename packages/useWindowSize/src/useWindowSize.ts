import { useState, useEffect } from 'react'

type ViewportSize = {
  height: number
  width: number
}

const isClient = typeof window === 'object'

function useWindowSize(clientOnly: boolean = false) {
  const [windowSize, setWindowSize] = useState<ViewportSize>({
    width: isClient && clientOnly ? window.innerWidth : 0,
    height: isClient && clientOnly ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    if (!clientOnly) handleSize()
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [clientOnly])

  return windowSize
}

export default useWindowSize
