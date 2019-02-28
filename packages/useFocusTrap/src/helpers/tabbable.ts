/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
const tabbableNode = /input|select|textarea|button|object/
const selector = 'a, input, select, textarea, button, object, [tabindex]'

function hidden(el: HTMLElement) {
  if (process.env.NODE_ENV === 'test') return false
  return (
    (el.offsetWidth <= 0 && el.offsetHeight <= 0) || el.style.display === 'none'
  )
}

function visible(element: HTMLElement) {
  let parentElement: HTMLElement = element
  while (parentElement) {
    if (parentElement === document.body) break
    if (hidden(parentElement)) return false
    parentElement = parentElement.parentNode as HTMLElement
  }

  return true
}

function focusable(element: HTMLElement, isTabIndexNotNaN: boolean) {
  const nodeName = element.nodeName.toLowerCase()
  const res =
    // @ts-ignore
    (tabbableNode.test(nodeName) && !element.disabled) ||
    (element instanceof HTMLAnchorElement
      ? element.href || isTabIndexNotNaN
      : isTabIndexNotNaN)

  return res && visible(element)
}

function tabbable(element: HTMLElement) {
  let tabIndex: string | null | undefined = element.getAttribute('tabindex')
  if (tabIndex === null) tabIndex = undefined
  const isTabIndexNaN = isNaN(parseInt(tabIndex as string))
  return (
    (isTabIndexNaN || parseInt(tabIndex as string, 10) >= 0) &&
    focusable(element, !isTabIndexNaN)
  )
}

export default function findTabbableDescendants(
  element: HTMLElement,
): Array<HTMLElement> {
  // @ts-ignore
  return Array.from(element.querySelectorAll(selector)).filter(tabbable)
}
