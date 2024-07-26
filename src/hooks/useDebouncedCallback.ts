import { useEffect, useMemo, useRef } from "react";

type DebounceOptions = {
  /**
   * If `leading`, and another callback is not pending, the function will be called immediately,
   * @default false
   */
  leading?: boolean;
  /**
   * If `trailing`, the callback function will be called after the wait period
   * @default true
   */
  trailing?: boolean;
};

/**
 * Extra methods added on the debounced function
 */
type CallbackMethods = {
  /**
   * Cancels any pending callbacks
   */
  cancel: () => void;
  /**
   * If a call is pending, this will flush the callback and call it immediately
   */
  flush: () => void;
  /**
   * Returns if a call is pending
   */
  isPending: () => boolean;
};

/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param func The function to be called
 * @param wait Wait period after function hasn't been called for
 * @param options {DebounceOptions} Options for the debounced callback
 *
 * ```tsx
 * const debounced = useDebouncedCallback((value: string) => {
 *  console.log(value);
 *  }, 500);
 *
 *  debounced("Hello");
 *  debounced("World"); // Will only log "World" after 500ms
 *  ```
 */
export function useDebouncedCallback<
  // biome-ignore lint/suspicious/noExplicitAny: we don't know the function signature
  T extends (...args: any[]) => ReturnType<T>,
>(
  func: T,
  wait: number,
  options: DebounceOptions = { trailing: true },
): ((...args: Parameters<T>) => void) & CallbackMethods {
  const timeout = useRef<NodeJS.Timeout | number | null>(null);
  const cb = useRef<T>(func);
  // Store the latest function as a ref, so we can call it when the timeout is done.
  // This ensures that the user doesn't accidentally recreate the debounced function.
  cb.current = func;

  useEffect(() => {
    return () => {
      // Clear any pending timeouts when the hook unmounts
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return useMemo(() => {
    let currentArgs: Parameters<T>;

    const debounce = (...args: Parameters<T>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      } else if (options.leading) {
        // If no timeout is pending, and leading is `true`, call the function immediately
        cb.current(...args);
      }

      // Store the args, so it's possible to flush the callback early
      currentArgs = args;

      // Start a new timer
      timeout.current = setTimeout(() => {
        timeout.current = null;

        if (options.trailing) {
          cb.current(...args);
        }
      }, wait);
    };

    debounce.cancel = () => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = null;
    };

    debounce.isPending = () => {
      return timeout.current !== null;
    };

    debounce.flush = () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;

        if (options.trailing) {
          cb.current(...currentArgs);
        }
      }
    };

    return debounce;
  }, [wait, options]);
}
