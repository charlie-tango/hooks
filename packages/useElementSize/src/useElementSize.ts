import { useState, useLayoutEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export default function useElementSize(): [
  (node: HTMLElement | null) => void,
  DOMRectReadOnly
] {
  const [nodeRef, setRef] = useState<HTMLElement | null>(null)
  const [elementSize, setElementSize] = useState<DOMRectReadOnly>(
    new DOMRectReadOnly(0, 0, 0, 0),
  )

  useLayoutEffect(() => {
    if (nodeRef) {
      const ro = new ResizeObserver(([entry]: Array<ResizeObserverEntry>) =>
        setElementSize(entry.contentRect as DOMRectReadOnly),
      )
      ro.observe(nodeRef)

      return () => {
        ro.disconnect()
      }
    }
    return
  }, [nodeRef])

  return [setRef, elementSize]
}
