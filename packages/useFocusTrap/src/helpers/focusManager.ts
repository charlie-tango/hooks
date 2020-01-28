import { findTabbableDescendants } from './tabbable'

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
    if (!focusElement) return
    if (focusElement.contains(document.activeElement)) {
      return
    }
    const el = findTabbableDescendants(focusElement)[0] || focusElement
    el.focus()
  }
}

export function markForFocusLater() {
  focusLaterElements.push(document.activeElement as HTMLElement)
}

export function returnFocus() {
  let toFocus = null
  try {
    toFocus = focusLaterElements.pop()
    if (toFocus) toFocus.focus()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(
      [
        'You tried to return focus to',
        toFocus,
        'but it is not in the DOM anymore',
      ].join(' '),
    )
  }
}

export function setupScopedFocus(element: HTMLElement) {
  focusElement = element
  document.addEventListener('focusout', handleBlur, false)
  document.addEventListener('focusin', handleFocus, true)
}

export function teardownScopedFocus() {
  focusElement = null
  document.removeEventListener('focusout', handleBlur)
  document.removeEventListener('focusin', handleFocus)
}
