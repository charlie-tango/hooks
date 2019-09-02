import { useCallback, useEffect, useRef } from 'react'
import {
  markForFocusLater,
  returnFocus,
  setupScopedFocus,
  teardownScopedFocus,
} from './helpers/focusManager'
import findTabbableDescendants from './helpers/tabbable'
import scopeTab from './helpers/scopeTab'

export type FocusTrapOptions = {
  focusSelector?: string
}

/**
 *  Traps focus to DOM node. Use this with a modal to ensure the user focus doesn't leave.
 * */
function useFocusTrap(
  active: boolean = true,
  options: FocusTrapOptions = {},
): (instance: HTMLElement | null) => void {
  const ref = useRef<HTMLElement | null>()

  const setRef = useCallback(
    node => {
      if (ref.current) {
        returnFocus()
        teardownScopedFocus()
      }
      if (active && node) {
        setupScopedFocus(node)
        markForFocusLater()
        let focusElement: HTMLElement | null = null
        if (options.focusSelector) {
          focusElement = node.querySelector(options.focusSelector)
        }

        if (!focusElement) {
          const tabbableChildren = findTabbableDescendants(node)
          if (tabbableChildren && tabbableChildren.length) {
            focusElement = tabbableChildren[0]
          }
        }

        if (focusElement) {
          focusElement.focus()
        }
        ref.current = node
      } else {
        ref.current = null
      }
    },
    [active, options.focusSelector],
  )

  useEffect(() => {
    if (!active) return undefined
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && ref.current) {
        scopeTab(ref.current, event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [active])

  return setRef
}

export default useFocusTrap
