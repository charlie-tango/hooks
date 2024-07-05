import { useRef } from "react";

export function useLazyRef<T>(init: () => T): T {
  const value = useRef<T | undefined>();
  if (!value.current) value.current = init();
  return value.current;
}
