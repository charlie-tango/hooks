import { useCallback, useEffect, useRef, useState } from 'react'

import debounce from 'lodash.debounce'

export type Position = {
    x: -1 | 0 | 1,
    y: -1 | 0 | 1
}

function useMouseClosestEdge(): [
  (element: HTMLElement | null) => void,
  Position
  ] {
    const elementRef = useRef<HTMLElement | null>()
    const [hovered, setHovered] = useState<Boolean>(false)
    const [direction, setDirection] = useState<Position>({ x: 0, y: 0 })
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)

    const handleMouseMove = (e: MouseEvent) => {
      const element = elementRef.current
      if (element) {
        const rect = element.getBoundingClientRect()
        const top = e.pageY <= (rect.top + (rect.height / 2))
        const left = e.pageX <= (rect.left + (rect.width / 2))
        setDirection({ x: left ? 1 : -1, y: top ? -1 : 1 })
      }
    }

    const debouncedHandleMouseMove = useRef(debounce(handleMouseMove, 20, { leading: true, maxWait: 100 }))

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
        return () => element.removeEventListener('mousemove', debouncedHandleMouseMove.current)
      }
      return
    }, [elementRef, hovered, debouncedHandleMouseMove])

    const setRef = useCallback((node: HTMLElement | null) => {
      if (node) {
        elementRef.current = node
      }
    }, [elementRef])

    return [setRef, hovered ? direction : { x: 0, y: 0 }]
}

export default useMouseClosestEdge
