import { useState, useCallback } from 'react'

/**
 * Toggle a boolean value whenever the toggle function is triggered.
 * @param initialValue {boolean}
 * @return [value, toggle]
 */
function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)
  const toggleFn = useCallback(() => setValue(toggled => !toggled), [])

  return [value, toggleFn]
}

export default useToggle
