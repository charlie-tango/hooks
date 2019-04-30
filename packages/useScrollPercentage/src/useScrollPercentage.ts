import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useState } from 'react'
import {
  calculateVerticalPercentage,
  calculateHorizontalPercentage,
} from './utils'

type HookResponse = [((node?: Element | null) => void), number]

function useScrollPercentage(
  options: IntersectionObserverInit = {},
  horizontal: boolean = false,
): HookResponse {
  const [ref, inView, entry] = useInView(options)
  const target = entry && entry.target
  const [percentage, setPercentage] = useState(0)

  const handleScroll = useCallback(() => {
    if (!target) return
    const bounds = target.getBoundingClientRect()
    const threshold = Array.isArray(options.threshold)
      ? options.threshold[0]
      : options.threshold

    const percentage = horizontal
      ? calculateHorizontalPercentage(bounds, threshold, options.root)
      : calculateVerticalPercentage(bounds, threshold, options.root)

    setPercentage(percentage)
  }, [target, options.threshold, options.root, horizontal])

  useEffect(() => {
    if (inView) {
      const root = options.root || window
      root.addEventListener('scroll', handleScroll, { passive: true })
      root.addEventListener('resize', handleScroll)

      // Trigger a scroll update, so we set the initial scroll percentage
      handleScroll()

      return () => {
        root.removeEventListener('scroll', handleScroll)
        root.removeEventListener('resize', handleScroll)
      }
    }
    return
  }, [inView, options.root, handleScroll])

  return [ref, percentage]
}

export default useScrollPercentage
