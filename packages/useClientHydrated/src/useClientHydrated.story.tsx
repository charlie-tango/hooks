import React, { useEffect, useState } from 'react'
import useClientHydrated from './useClientHydrated'

export const SSRHydratedState = () => {
  return (
    <code>
      {useClientHydrated() ? 'Client already hydrated' : 'Initial render'}
    </code>
  )
}

export const RehydrateOnClient = () => {
  const hydrated = useClientHydrated()
  // Set the initial ready state based on hydrated. Will be `false` first time the component is rendered, but true after hydration.
  const [ready, setReady] = useState(hydrated)
  useEffect(() => {
    // We have been hydrated correctly now
    setReady(true)
  }, [])

  return <code>{ready ? 'Hydrated' : 'Hydrating'}</code>
}
