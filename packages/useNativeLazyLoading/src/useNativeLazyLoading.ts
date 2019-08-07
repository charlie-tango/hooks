import { useEffect, useState } from 'react'

function useNativeLazyLoading(initialSupported?: boolean) {
  const [supported, setSupported] = useState<boolean | undefined>(
    initialSupported,
  )

  useEffect(() => {
    setSupported('loading' in HTMLImageElement.prototype)
  }, [])

  return supported
}

export default useNativeLazyLoading
