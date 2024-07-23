import { useCallback, useRef, useState } from "react";

type ElementSizeResponse = {
  ref: (node: HTMLElement | null) => void;
  size: Omit<DOMRectReadOnly, "toJSON">;
};

/**
 * Monitor the size of an element, and return the size object.
 * Uses the ResizeObserver API, so it will keep track of the size changes.
 *
 * ```tsx
 * const { ref, size } = useElementSize();
 *
 * return <div ref={ref}>Element size: {size.width}x{size.height}</div>;
 * ```
 */
export function useElementSize(): ElementSizeResponse {
  const ro = useRef<ResizeObserver>();
  const [elementSize, setElementSize] = useState<ElementSizeResponse["size"]>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const setRef = useCallback((node: HTMLElement | null) => {
    if (ro.current) {
      ro.current.disconnect();
    }
    if (node) {
      if (!ro.current) {
        let observerStarted = false;
        ro.current = new ResizeObserver(([entry]) => {
          if (observerStarted) {
            observerStarted = false;
            return;
          }

          ro.current?.disconnect();
          setElementSize({
            x: entry.contentRect.x,
            y: entry.contentRect.y,
            width: entry.contentRect.width,
            height: entry.contentRect.height,
            left: entry.contentRect.left,
            top: entry.contentRect.top,
            right: entry.contentRect.right,
            bottom: entry.contentRect.bottom,
          });

          observerStarted = true;
          requestAnimationFrame(() => {
            ro.current?.observe(node);
          });
        });
      }
      if (ro.current) ro.current.observe(node);
    } else {
      ro.current = undefined;
    }
  }, []);

  return { ref: setRef, size: elementSize };
}
