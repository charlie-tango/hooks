import * as React from 'react'
import { createContext, useCallback, useContext, useRef } from 'react'

type IdCallback = () => string

const Context = createContext<IdCallback | undefined>(undefined)

type IdProviderProps = {
  children: React.ReactNode
}

export const IdProvider = (props: IdProviderProps) => {
  const ref = useRef(0)
  const generateId = useCallback(() => (++ref.current).toString(), [])

  return (
    <Context.Provider value={generateId}>{props.children}</Context.Provider>
  )
}

/**
 * Return a deterministic Id for this Hook. Optionally add prefix to the id
 * @param prefix
 */
const useId = (prefix?: string) => {
  const generateId = useContext(Context)
  if (!generateId) {
    throw new Error(
      'The "useId" hook requires the "IdProvider" to be added to the root of the application.',
    )
  }
  const ref = useRef(generateId())

  return prefix ? `${prefix}_${ref.current}` : ref.current
}

export default useId
