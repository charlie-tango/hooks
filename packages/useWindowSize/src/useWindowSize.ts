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
      setWindowSize((prevState) => {
        // Don't create a new state object if the size didn't change (e.g. after initial render)
        return prevState.height !== window.innerHeight ||
          prevState.width !== window.innerWidth
          ? {
              width: window.innerWidth,
              height: window.innerHeight,
            }
          : prevState
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
