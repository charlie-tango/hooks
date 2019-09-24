import { useCallback, useReducer, useRef } from 'react'

type InteractionState = {
  active: boolean
  focus: boolean
  focusVisible: boolean
  hover: boolean
}

const events = [
  'focus',
  'blur',
  'mouseenter',
  'mouseleave',
  'mousedown',
  'mouseup',
]

function reducer(state: InteractionState, event: Event) {
  switch (event.type) {
    case 'mouseenter':
      return { ...state, hover: true }
    case 'mouseleave':
      return { ...state, hover: false }
    case 'focus':
      const target = event.target as HTMLElement

      return {
        ...state,
        focus: true,
        focusVisible: target.classList.contains('focus-visible'),
      }
    case 'blur':
      return { ...state, focus: false, focusVisible: false }
    case 'mousedown':
      return { ...state, active: true }
    case 'mouseup':
      return { ...state, active: false }
  }

  return state
}

const initial: InteractionState = {
  active: false,
  focus: false,
  focusVisible: false,
  hover: false,
}

function useInteraction(): [
  (element: HTMLElement | null) => void,
  InteractionState,
] {
  const ref = useRef<HTMLElement | null>()
  const [state, dispatch] = useReducer(reducer, initial)

  const setRef = useCallback(node => {
    if (ref.current) {
      const previous = ref.current
      events.forEach(event => {
        previous.removeEventListener(event, dispatch)
      })
    }
    if (node) {
      ref.current = node
      events.forEach(event => {
        node.addEventListener(event, dispatch)
      })
    } else {
      ref.current = null
    }
  }, [])

  return [setRef, state]
}

export default useInteraction
