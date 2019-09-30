import { useState, useRef, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface SizeRectReadonly {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export default function useElementSize(): [
  (node: HTMLElement | null) => void,
  SizeRectReadonly,
] {
  const ro = useRef<ResizeObserver>()
  const [elementSize, setElementSize] = useState<SizeRectReadonly>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const setRef = useCallback((node: HTMLElement | null) => {
    if (ro.current) {
      ro.current.disconnect()
    }
    if (node) {
      if (!ro.current) {
        // @ts-ignore
        ro.current = new (window.ResizeObserver || ResizeObserver)(
          ([entry]: Array<ResizeObserverEntry>) => {
            const { x, y, width, height } = entry.contentRect
            setElementSize({ x, y, width, height })
          },
        )
      }
      if (ro.current) ro.current.observe(node)
    } else {
      ro.current = undefined
    }
  }, [])

  return [setRef, elementSize]
}
