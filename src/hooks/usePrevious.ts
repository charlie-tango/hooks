import React, { useRef } from "react";

/**
 * Get the previous value of a variable.
 *
 * ```tsx
 * const previousValue = usePrevious(value);
 * ```
 */
export function usePrevious<T = unknown>(value: T) {
  const ref = useRef<T>(undefined);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
