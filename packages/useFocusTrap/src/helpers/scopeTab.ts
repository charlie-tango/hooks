import { findTabbableDescendants } from './tabbable'

/**
 * Controls tabbing, so it stays inside the node element
 * @param node
 * @param event
 */
export default function scopeTab(node: HTMLElement, event: KeyboardEvent) {
  const tabbable = findTabbableDescendants(node)
  if (!tabbable.length) {
    event.preventDefault()
    return
  }
  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1]
  const leavingFinalTabbable =
    finalTabbable === document.activeElement ||
    // handle immediate shift+tab after opening with mouse
    node === document.activeElement
  if (!leavingFinalTabbable) return
  event.preventDefault()

  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0]
  if (target) target.focus()
}
