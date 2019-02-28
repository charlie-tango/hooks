import findTabbable from './tabbable'

const focusLaterElements: Array<HTMLElement> = []
let focusElement: HTMLElement | null = null
let needToFocus = false

function handleBlur() {
  needToFocus = true
}

function handleFocus() {
  if (needToFocus) {
    needToFocus = false
    if (!focusElement) {
      return
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(() => {
      if (!focusElement) return
      if (focusElement.contains(document.activeElement)) {
        return
      }
      const el = findTabbable(focusElement)[0] || focusElement
      el.focus()
    }, 0)
  }
}

export function markForFocusLater() {
  focusLaterElements.push(document.activeElement as HTMLElement)
}

/* eslint-disable no-console */
export function returnFocus() {
  let toFocus = null
  try {
    toFocus = focusLaterElements.pop()
    if (toFocus) toFocus.focus()
  } catch (e) {
    console.warn(
      [
        'You tried to return focus to',
        toFocus,
        'but it is not in the DOM anymore',
      ].join(' '),
    )
  }
}
/* eslint-enable no-console */

export function setupScopedFocus(element: HTMLElement) {
  focusElement = element
  window.addEventListener('blur', handleBlur, false)
  document.addEventListener('focus', handleFocus, true)
}

export function teardownScopedFocus() {
  focusElement = null
  window.removeEventListener('blur', handleBlur)
  document.removeEventListener('focus', handleFocus)
}
