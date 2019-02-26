import { useState, useLayoutEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface SizeRectReadonly {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export default function useElementSize(): [
  (node: HTMLElement | null) => void,
  SizeRectReadonly
] {
  const [nodeRef, setRef] = useState<HTMLElement | null>(null)
  const [elementSize, setElementSize] = useState<SizeRectReadonly>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  useLayoutEffect(() => {
    if (nodeRef) {
      const ro = new ResizeObserver(([entry]: Array<ResizeObserverEntry>) => {
        const { x, y, width, height } = entry.contentRect
        setElementSize({ x, y, width, height })
      })
      ro.observe(nodeRef)

      return () => {
        ro.disconnect()
      }
    }
    return
  }, [nodeRef])

  return [setRef, elementSize]
}
