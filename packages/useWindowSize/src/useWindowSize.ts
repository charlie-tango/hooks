import { useState, useEffect } from 'react'
import useClientHydrated from '@charlietango/use-client-hydrated'

type ViewportSize = {
  height: number
  width: number
}

function useWindowSize() {
  const clientHydrated = useClientHydrated()
  const [windowSize, setWindowSize] = useState<ViewportSize>(
    clientHydrated
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      : { width: 0, height: 0 },
  )

  useEffect(() => {
    function handleSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleSize()
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
