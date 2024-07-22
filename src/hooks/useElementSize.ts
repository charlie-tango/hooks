import { useCallback, useRef, useState } from "react";

type ElementSizeResponse = [
  (node?: HTMLElement | null) => void,
  DOMRectReadOnly,
] & {
  ref: (node?: HTMLElement | null) => void;
  size: DOMRectReadOnly;
};

/**
 * Monitor the size of an element, and return the size object.
 * Uses the ResizeObserver API, so it will keep track of the size changes.
 */
export function useElementSize(): ElementSizeResponse {
  const ro = useRef<ResizeObserver>();
  const [elementSize, setElementSize] = useState<DOMRectReadOnly>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    toJSON() {},
  });

  const setRef = useCallback((node: HTMLElement | null) => {
    if (ro.current) {
      ro.current.disconnect();
    }
    if (node) {
      if (!ro.current) {
        let observerStarted = false;

        // @ts-ignore
        ro.current = new ResizeObserver(([entry]) => {
          if (observerStarted) {
            observerStarted = false;
            return;
          }

          ro.current?.disconnect();

          setElementSize(entry.contentRect);

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

  const result = [setRef, elementSize] as ElementSizeResponse;

  // Support object destructuring, by adding the specific values.
  result.ref = result[0];
  result.size = result[1];

  return result;
}
