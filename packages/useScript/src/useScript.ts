import { useEffect, useState } from 'react'

export enum ScriptStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  READY = 'ready',
  ERROR = 'error',
}

/**
 * Hook to load an external script. Returns true once the script has finished loading.
 *
 * @param url {string} url The external script to load
 * */
export default function useScript(url?: string): [boolean, ScriptStatus] {
  const [status, setStatus] = useState<ScriptStatus>(
    url ? ScriptStatus.LOADING : ScriptStatus.IDLE,
  )

  useEffect(() => {
    if (!url) {
      setStatus(ScriptStatus.IDLE)
      return
    }
    setStatus(ScriptStatus.LOADING)
    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${url}"]`,
    )

    if (!script) {
      script = document.createElement('script')
      script.src = url
      script.async = true
      document.head.appendChild(script)

      script.onerror = () => {
        if (script) script.setAttribute('data-status', ScriptStatus.ERROR)
      }
      script.onload = () => {
        if (script) script.setAttribute('data-status', ScriptStatus.READY)
      }
    } else if (script.hasAttribute('data-status')) {
      setStatus(script.getAttribute('data-status') as ScriptStatus)
    }

    const eventHandler = (e: Event) => {
      setStatus(e.type === 'load' ? ScriptStatus.READY : ScriptStatus.ERROR)
    }

    // Add load event listener
    script.addEventListener('load', eventHandler)
    script.addEventListener('error', eventHandler)

    return () => {
      if (script) {
        script.removeEventListener('load', eventHandler)
        script.removeEventListener('error', eventHandler)
      }
    }
  }, [url])

  return [status === ScriptStatus.READY, status]
}
