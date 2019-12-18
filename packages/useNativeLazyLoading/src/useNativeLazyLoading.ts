import { useEffect, useState } from 'react'

let isSupported: boolean | undefined = undefined

function useNativeLazyLoading() {
  const [supported, setSupported] = useState<boolean | undefined>(isSupported)

  useEffect(() => {
    if (isSupported === undefined) {
      isSupported = 'loading' in HTMLImageElement.prototype
      setSupported(isSupported)
    }
  }, [])

  return supported
}

export default useNativeLazyLoading
