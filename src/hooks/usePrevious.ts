import React, { useRef } from "react";

export function usePrevious<T = unknown>(value: T) {
  const ref = useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
