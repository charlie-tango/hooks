import { useEffect, useRef, useState } from 'react'

import debounce from 'lodash.debounce'

export type Direction = {
    x: -1 | 0 | 1,
    y: -1 | 0 | 1
}

function useMouseDirection() {
    const elementRef = useRef()
    const [hovered, setHovered] = useState<Boolean>(false)
    const [direction, setDirection] = useState<Direction>({ x: 0, y: 0 })
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)

    const handleMouseMove = (e: MouseEvent) => {
      // TODO: implement fallback for IE?
      const y = e.movementY >= 1 ? -1 : (e.movementY < 0 ? 1 : 0)
      const x = e.movementX >= 1 ? -1 : (e.movementX < 0 ? 1 : 0)
      setDirection({ x, y })
    }

    const debouncedHandleMouseMove = useRef(debounce(handleMouseMove, 50, { maxWait: 100 }))

    useEffect(() => {
        const element: HTMLElement = elementRef.current
        if (element) {
          element.addEventListener('mouseenter', handleMouseEnter)
          element.addEventListener('mouseleave', handleMouseLeave)
        }
        return () => {
          element.removeEventListener('mouseenter', handleMouseEnter)
          element.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [elementRef, setHovered])

    useEffect(() => {
      const element: HTMLElement = elementRef.current
      if (element && hovered) {
        element.addEventListener('mousemove', debouncedHandleMouseMove.current)
      }
      return () => element.removeEventListener('mousemove', debouncedHandleMouseMove.current)
    }, [elementRef, hovered, debouncedHandleMouseMove])

    return [elementRef, hovered ? direction : { x: 0, y: 0 }]
}

export default useMouseDirection
