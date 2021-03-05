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
        let observerStarted = false
        // @ts-ignore
        ro.current = new ResizeObserver(([entry]) => {
          if (observerStarted) {
            observerStarted = false
            return
          }

          ro.current?.disconnect()
          // [Operation that would cause resize here]
          const { x, y, width, height } = entry.contentRect
          setElementSize({ x, y, width, height })

          observerStarted = true
          requestAnimationFrame(() => {
            ro.current?.observe(node)
          })
        })
      }
      if (ro.current) ro.current.observe(node)
    } else {
      ro.current = undefined
    }
  }, [])

  return [setRef, elementSize]
}
