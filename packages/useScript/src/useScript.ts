import { useEffect, useReducer } from 'react'

enum ScriptStatus {
  LOADED = 'loaded',
  ERROR = 'error',
}

type Action = {
  type: ScriptStatus
}

type State = {
  ready: boolean
  error?: boolean
}

const INITIAL_STATE: State = { ready: false, error: undefined }

function scriptLoadReducer(state: State, action: Action): State {
  switch (action.type) {
    case ScriptStatus.LOADED:
      return { ...INITIAL_STATE, ready: true }
    case ScriptStatus.ERROR:
      return { ...INITIAL_STATE, error: true }
    default: {
      throw new Error('Invalid action dispatched.')
    }
  }
}

function noop() {}

/**
 * Hook to load an external script. Returns true once the script has finished loading.
 *
 * @param {string} url The external script to load
 * @return boolean True if the script has been loaded
 * */
export default function useScript(url: string): [boolean, boolean?] {
  const [{ ready, error }, dispatch] = useReducer(
    scriptLoadReducer,
    INITIAL_STATE,
  )

  useEffect(() => {
    function onReady() {
      // The ready event is fired whenever the resource is loaded, but it doesn't know if it was successful
      dispatch({ type: ScriptStatus.LOADED })
    }

    function onError() {
      // The ready event is fired whenever the resource errors-out
      dispatch({ type: ScriptStatus.ERROR })
    }

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
        onReady()
        // Already loaded, so we can return early
        return noop
      }

      if (script.getAttribute('data-failed') === 'true') {
        onError()
        // Already tried loading, so we can return early
        return noop
      }
    }

    // Add load event listener
    script.addEventListener('load', onReady)
    script.addEventListener('error', onError)

    return () => {
      if (script) {
        script.removeEventListener('load', onReady)
        script.removeEventListener('error', onError)
      }
    }
  }, [url])

  return [ready, error]
}
