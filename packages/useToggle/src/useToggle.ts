import { useCallback, useState } from "react";

/**
 * Toggle a boolean value whenever the toggle function is triggered.
 */
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggleFn = useCallback(() => setValue((toggled) => !toggled), []);

  return [value, toggleFn];
}
