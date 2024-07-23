import { useCallback, useRef, useState } from "react";

type ElementSizeResponse = {
  ref: (node: HTMLElement | null) => void;
  size: { width: number; height: number };
};

type ElementSizeOptions = {
  /**
   * The type of box model to use when calculating the size.
   * - `borderBox`: Includes padding and border in the size.
   * - `contentBox`: Excludes padding and border from the size.
   * @default "borderBox"
   */
  type?: "borderBox" | "contentBox";
  /**
   * Skip creating the ResizeObserver and monitoring the element size.
   */
  skip?: boolean;
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
export function useElementSize(
  options: ElementSizeOptions = {},
): ElementSizeResponse {
  const ro = useRef<ResizeObserver>();
  const [elementSize, setElementSize] = useState<ElementSizeResponse["size"]>({
    width: 0,
    height: 0,
  });

  if (options.skip && elementSize.width !== 0 && elementSize.height !== 0) {
    // Reset the size if the observer goes from monitoring to skipping
    setElementSize({ width: 0, height: 0 });
    // Make sure the observer is killed
    if (ro.current) {
      ro.current.disconnect();
      ro.current = undefined;
    }
  }

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (ro.current) {
        ro.current.disconnect();
      }
      if (node && !options.skip) {
        if (!ro.current) {
          let observerStarted = false;
          ro.current = new ResizeObserver(([entry]) => {
            if (observerStarted) {
              observerStarted = false;
              return;
            }

            let width: number;
            let height: number;

            if (entry.borderBoxSize) {
              const boxSize =
                options.type === "contentBox"
                  ? entry.contentBoxSize[0]
                  : entry.borderBoxSize[0];

              width = boxSize.inlineSize;
              height = boxSize.blockSize;
            } else {
              // Fallback for browsers that don't support borderBoxSize. Use the old deprecated `contentRect`.
              width = entry.contentRect.width;
              height = entry.contentRect.height;
            }

            // Disconnect the observer to prevent infinite loops
            ro.current?.disconnect();
            setElementSize({
              width,
              height,
            });

            observerStarted = true;
            requestAnimationFrame(() => {
              // Reattach the observer in the next frame, so it continues to monitor the element
              ro.current?.observe(node);
            });
          });
        }
        if (ro.current) ro.current.observe(node);
      } else {
        ro.current = undefined;
      }
    },
    [options.type, options.skip],
  );

  return { ref: setRef, size: elementSize };
}
