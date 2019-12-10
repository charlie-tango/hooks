import { useCallback, useReducer, useRef } from 'react'

type InteractionState = {
  /** The user is currently pressing the element, either with the mouse or touch */
  active: boolean
  /** The element has focus */
  focus: boolean
  /** The focus outline shouldn't be shown - Enabled if using 'focus-visible' polyfill */
  focusVisible: boolean
  /** An element inside this element currently has focus */
  focusWithin: boolean
  /** The user is hovering over the element with the mouse */
  hover: boolean
}

const events = [
  'focus',
  'blur',
  'focusin',
  'focusout',
  'mouseenter',
  'mouseleave',
  'mousedown',
  'mouseup',
]

const passiveEvents = ['touchstart', 'touchend']

function eventReducer(state: InteractionState, event: Event) {
  const target = event.target as HTMLElement
  switch (event.type) {
    case 'mouseenter':
      return { ...state, hover: true }
    case 'mouseleave':
      return { ...state, hover: false }
    case 'focus':
      return {
        ...state,
        focus: true,
        focusVisible: target.hasAttribute('data-focus-visible-added'),
      }
    case 'blur':
      return { ...state, focus: false, focusVisible: false }
    case 'mousedown':
    case 'touchstart':
      return { ...state, active: true }
    case 'mouseup':
    case 'touchend':
      return { ...state, active: false }
    case 'focusin':
      return {
        ...state,
        focusWithin: true,
        focusVisible: target.hasAttribute('data-focus-visible-added'),
      }
    case 'focusout':
      return {
        ...state,
        focusWithin: false,
        focusVisible: false,
      }
  }

  return state
}

const initial: InteractionState = {
  active: false,
  focus: false,
  focusVisible: false,
  focusWithin: false,
  hover: false,
}

function useInteraction(): [
  (element: HTMLElement | null) => void,
  InteractionState,
] {
  const ref = useRef<HTMLElement | null>()
  const [state, dispatch] = useReducer(eventReducer, initial)

  const setRef = useCallback(node => {
    if (ref.current) {
      const previous = ref.current
      events.forEach(event => {
        previous.removeEventListener(event, dispatch)
      })
      passiveEvents.forEach(event => {
        previous.removeEventListener(event, dispatch)
      })
    }
    if (node) {
      ref.current = node
      events.forEach(event => {
        node.addEventListener(event, dispatch)
      })
      passiveEvents.forEach(event => {
        node.addEventListener(event, dispatch, { passive: true })
      })
    } else {
      ref.current = null
    }
  }, [])

  return [setRef, state]
}

export default useInteraction
