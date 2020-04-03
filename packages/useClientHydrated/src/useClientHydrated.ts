import { useEffect } from 'react'
let clientHydrated = false

/**
 * Returns false when serverside rendering and during the first render pass (hydration) in the client.
 * Use this to modify behavior of components when they can be certain they are running client side.
 * Like check a media query during the initial render.
 * */
function useClientHydrated() {
  useEffect(() => {
    if (!clientHydrated) clientHydrated = true
  }, [])

  return clientHydrated
}

export default useClientHydrated
