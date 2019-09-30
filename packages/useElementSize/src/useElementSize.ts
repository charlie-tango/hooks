import { useState, useRef, useCallback } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import { ResizeObserverEntry } from '@juggle/resize-observer/lib/ResizeObserverEntry'
import { DOMRectReadOnly } from '@juggle/resize-observer/lib/DOMRectReadOnly'
import { ResizeObserverBoxOptions } from '@juggle/resize-observer/lib/ResizeObserverBoxOptions'

interface SizeRectReadonly {
  readonly contentRect?: DOMRectReadOnly
  readonly width: number
  readonly height: number
}

export default function useElementSize(): [
  (node: HTMLElement | null) => void,
  SizeRectReadonly,
] {
  const ro = useRef<ResizeObserver>()
  const [elementSize, setElementSize] = useState<SizeRectReadonly>({
    contentRect: undefined,
    width: 0,
    height: 0,
  })

  const setRef = useCallback((node: HTMLElement | null) => {
    if (ro.current) {
      ro.current.disconnect()
    }
    if (node) {
      if (!ro.current) {
        ro.current = new ResizeObserver(
          ([entry]: Array<ResizeObserverEntry>) => {
            setElementSize({
              width: entry.borderBoxSize.inlineSize,
              height: entry.borderBoxSize.blockSize,
              contentRect: entry.contentRect,
            })
          },
        )
      }
      ro.current.observe(node, { box: ResizeObserverBoxOptions.BORDER_BOX })
    } else {
      ro.current = undefined
    }
  }, [])

  return [setRef, elementSize]
}
