import { useEffect } from 'react'

/**
 * Shown an alert to the user before they navigate away from the current page.
 * @param message Try to disable this message to the user
 * @param disabled Disable blocking the event
 */
export function useBeforeUnload(message?: string, disabled?: boolean) {
  function stopUnload(e: BeforeUnloadEvent) {
    if (!disabled) {
      e.preventDefault()
      e.returnValue = message || '' // Chrome requires returnValue to be set
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', stopUnload)
    return () => {
      window.removeEventListener('beforeunload', stopUnload)
    }
  }, [])
}
