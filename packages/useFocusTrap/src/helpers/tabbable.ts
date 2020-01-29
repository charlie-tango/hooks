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
export const focusSelector =
  'a, input, select, textarea, button, object, [tabindex]'

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

function getElementTabIndex(element: HTMLElement) {
  let tabIndex: string | null | undefined = element.getAttribute('tabindex')
  if (tabIndex === null) tabIndex = undefined
  return parseInt(tabIndex as string, 10)
}

export function focusable(element: HTMLElement) {
  const nodeName = element.nodeName.toLowerCase()
  const isTabIndexNotNaN = !isNaN(getElementTabIndex(element))
  const res =
    // @ts-ignore
    (tabbableNode.test(nodeName) && !element.disabled) ||
    (element instanceof HTMLAnchorElement
      ? element.href || isTabIndexNotNaN
      : isTabIndexNotNaN)

  return res && visible(element)
}

export function tabbable(element: HTMLElement) {
  const tabIndex = getElementTabIndex(element)
  const isTabIndexNaN = isNaN(tabIndex)
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element)
}

/**
 * Tabbable elements are elements the user can tab between. This excludes elements with tabIndex=-1
 * */
export function findTabbableDescendants(
  element: HTMLElement,
): Array<HTMLElement> {
  return Array.from(
    element.querySelectorAll<HTMLElement>(focusSelector),
  ).filter(tabbable)
}
