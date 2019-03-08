import { useState, useCallback } from 'react'

function useToggle(initialValue: boolean = false): [boolean, () => any] {
  const [value, setValue] = useState(initialValue)
  const toggleFn = useCallback(() => setValue(toggled => !value), [value])
  return [value, toggleFn]
}

export default useToggle
