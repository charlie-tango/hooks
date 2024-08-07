import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getSnapshot = () =>
  JSON.stringify({
    width: window.innerWidth,
    height: window.innerHeight,
  });

const getServerSnapshot = () => JSON.stringify({ width: 0, height: 0 });

/**
 * Get the current window size. If the window resizes, the hook will update the size.
 *
 * ```tsx
 * const { width, height } = useWindowSize();
 * ```
 */
export function useWindowSize() {
  return JSON.parse(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  ) as { width: number; height: number };
}
