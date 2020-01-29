import { useCallback, useEffect, useRef } from 'react'
import {
  markForFocusLater,
  returnFocus,
  setupScopedFocus,
  teardownScopedFocus,
} from './helpers/focusManager'
import { focusSelector, focusable, tabbable } from './helpers/tabbable'
import scopeTab from './helpers/scopeTab'
import { createAriaHider } from './helpers/ariaHider'

export type FocusTrapOptions = {
  focusSelector?: string | HTMLElement
  disableAriaHider?: boolean
}

/**
 *  Traps focus to DOM node. Use this with a modal to ensure the user focus doesn't leave.
 * */
function useFocusTrap(
  active: boolean = true,
  options: FocusTrapOptions = {},
): (instance: HTMLElement | null) => void {
  const ref = useRef<HTMLElement | null>()
  const restoreAria = useRef<Function | null>(null)

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (restoreAria.current) {
        restoreAria.current()
      }
      if (ref.current) {
        returnFocus()
        teardownScopedFocus()
      }
      if (active && node) {
        setupScopedFocus(node)
        markForFocusLater()

        const processNode = (node: HTMLElement) => {
          // See if we should disable aria
          restoreAria.current = !options.disableAriaHider
            ? createAriaHider(node)
            : null

          // Find the initial focus element
          let focusElement: HTMLElement | null = null
          if (options.focusSelector) {
            focusElement =
              typeof options.focusSelector === 'string'
                ? node.querySelector(options.focusSelector)
                : options.focusSelector
          }

          if (!focusElement) {
            const children = Array.from<HTMLElement>(
              node.querySelectorAll(focusSelector),
            )
            focusElement =
              // Prefer tabbable elements, But fallback to any focusable element
              children.find(tabbable) ||
              // But fallback to any focusable element
              children.find(focusable) ||
              // Nothing found
              null

            // If everything else fails, see if the node itself can handle focus
            if (!focusElement && focusable(node)) focusElement = node
          }

          if (focusElement) {
            // Set the initial focus inside the traps
            focusElement.focus()
          } else {
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.warn(
                '[useFocusTrap]: Failed to find a focusable element after activating the focus trap. Make sure to include at an element that can recieve focus. As a fallback, you can also set "tabIndex={-1}" on the focus trap node.',
                node,
              )
            }
          }
        }

        // Delay processing the HTML node by a frame. This ensures focus is assigned correctly.
        setTimeout(() => {
          if (node.ownerDocument) {
            processNode(node)
          } else if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(
              '[useFocusTrap]: The focus trap is not part of the DOM yet, so it is unable to correctly set focus. Make sure to render the ref node.',
              node,
            )
          }
        })

        ref.current = node
      } else {
        ref.current = null
      }
    },
    [active, options.focusSelector, options.disableAriaHider],
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
