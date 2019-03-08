import { useCallback, useEffect, useState } from 'react'
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
  const [ref, setRef] = useState<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Tab' && ref) {
        scopeTab(ref, event)
      }
    },
    [ref],
  )

  useEffect(() => {
    if (active && ref) {
      document.addEventListener('keydown', handleKeyDown)
      setupScopedFocus(ref)
      markForFocusLater()
      let focusElement: HTMLElement | null = null
      if (options.focusSelector) {
        focusElement = ref.querySelector(options.focusSelector)
      }

      if (!focusElement) {
        const tabbableChildren = findTabbableDescendants(ref)
        if (tabbableChildren && tabbableChildren.length) {
          focusElement = tabbableChildren[0]
        }
      }

      if (focusElement) {
        focusElement.focus()
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        returnFocus()
        teardownScopedFocus()
      }
    }
    return () => {}
  }, [active, ref, handleKeyDown, options.focusSelector])

  return setRef
}

export default useFocusTrap
