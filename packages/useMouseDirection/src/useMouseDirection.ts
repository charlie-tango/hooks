import { useCallback, useEffect, useRef, useState } from 'react'

import debounce from 'lodash.debounce'

export type Direction = {
  x: -1 | 0 | 1
  y: -1 | 0 | 1
}

function useMouseDirection(): [
  (element: HTMLElement | null) => void,
  Direction,
] {
  const elementRef = useRef<HTMLElement | null>()
  const mouseMovingRef = useRef<number>()
  const [hovered, setHovered] = useState<Boolean>(false)
  const [direction, setDirection] = useState<Direction>({ x: 0, y: 0 })

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)
  const handleMouseMove = (e: MouseEvent) => {
    const mouseMoving = mouseMovingRef.current
    if (mouseMoving) window.clearTimeout(mouseMoving)
    const y = e.movementY >= 1 ? -1 : e.movementY < 0 ? 1 : 0
    const x = e.movementX >= 1 ? -1 : e.movementX < 0 ? 1 : 0
    setDirection({ x, y })
    mouseMovingRef.current = window.setTimeout(
      () => setDirection({ x: 0, y: 0 }),
      250,
    )
  }

  const debouncedHandleMouseMove = useRef(
    debounce(handleMouseMove, 30, { leading: true, maxWait: 250 }),
  )

  useEffect(() => {
    const element = elementRef.current
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
    return
  }, [elementRef, setHovered])

  useEffect(() => {
    const element = elementRef.current
    if (element && hovered) {
      element.addEventListener('mousemove', debouncedHandleMouseMove.current)
      return () =>
        element.removeEventListener(
          'mousemove',
          debouncedHandleMouseMove.current,
        )
    }
    return
  }, [elementRef, hovered, debouncedHandleMouseMove])

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        elementRef.current = node
      }
    },
    [elementRef],
  )

  return [setRef, hovered ? direction : { x: 0, y: 0 }]
}

export default useMouseDirection
