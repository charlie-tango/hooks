import { useEffect, useState } from 'react'

/**
 * Hook to load an external script. Returns true once the script has finished loading.
 *
 * @param {string} url The external script to load
 * @return boolean True if the script has been loaded
 * */
export function useScript(url: string): boolean {
  const [ready, setReady] = useState<boolean>(false)

  function onReady() {
    // The ready event is fired whenever the resource is loaded, but it doesn't know if it was successful
    setReady(true)
  }

  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${url}"]`,
    )

    if (!script) {
      script = document.createElement('script')
      script.src = url
      script.async = true
      document.head.appendChild(script)

      script.onerror = () => {
        if (script) script.setAttribute('data-failed', 'true')
      }
      script.onload = () => {
        if (script) script.setAttribute('data-loaded', 'true')
      }
    } else {
      if (script.getAttribute('data-loaded') === 'true') {
        setReady(true)
        // Already loaded, so we can return early
        return () => {}
      }
    }

    // Add load event listener
    script.addEventListener('load', onReady)

    return () => {
      if (script) script.removeEventListener('load', onReady)
    }
  }, [url])

  return ready
}
