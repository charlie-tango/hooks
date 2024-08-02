import { useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "./useDebouncedCallback";

type DebounceOptions = {
  /**
   * If `leading`, and another callback is not pending, the value will be called immediately,
   * @default false
   */
  leading?: boolean;
  /**
   * If `trailing`, the value will be updated after the wait period
   * @default true
   */
  trailing?: boolean;
};

/**
 * Debounce the update of a value
 * @param initialValue The initial value of the debounced value
 * @param wait Wait period after function hasn't been called for
 * @param options {DebounceOptions} Options for the debounced callback
 * @returns Array with the debounced value and a function to update the debounced value
 *
 * ```tsx
 *  const [value, setValue] = useDebouncedValue('hello', 500);
 *
 *  setValue('world'); // Will only update the value to 'world' after 500ms
 *  ```
 */
export function useDebouncedValue<T>(
  initialValue: T,
  wait: number,
  options: DebounceOptions = { trailing: true },
): [T, (value: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const previousValueRef = useRef<T | undefined>(initialValue);

  const updateDebouncedValue = useDebouncedCallback(
    setDebouncedValue,
    wait,
    options,
  );

  // Update the debounced value if the initial value changes
  if (previousValueRef.current !== initialValue) {
    updateDebouncedValue(initialValue);
    previousValueRef.current = initialValue;
  }

  return [debouncedValue, updateDebouncedValue];
}
