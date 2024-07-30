import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  const viewport = window.visualViewport || window;
  viewport.addEventListener("resize", callback);
  return () => {
    viewport.removeEventListener("resize", callback);
  };
};

const getSnapshot = () => {
  return JSON.stringify({
    width: window.visualViewport?.width ?? window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight,
  });
};
const getServerSnapshot = () => JSON.stringify({ width: 0, height: 0 });

/**
 * Get the current viewport size. If the viewport resizes, the hook will update the size.
 * This will prefer the [visual viewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport) size if available, otherwise it will use the window size.
 *
 *
 * ```tsx
 * const { width, height } = useViewportSize();
 * ```
 */
export function useViewportSize() {
  return JSON.parse(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  ) as { width: number; height: number };
}
