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
  const ref = useRef<ResizeObserver>()
  const [elementSize, setElementSize] = useState<SizeRectReadonly>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const setRef = useCallback((node: HTMLElement | null) => {
    if (ref.current) {
      ref.current.disconnect()
    }
    if (node) {
      const ro = new ResizeObserver(([entry]: Array<ResizeObserverEntry>) => {
        const { x, y, width, height } = entry.contentRect
        setElementSize({ x, y, width, height })
      })
      ro.observe(node)
      // Store a reference to the node
      ref.current = ro
    } else {
      ref.current = undefined
    }
  }, [])

  return [setRef, elementSize]
}
