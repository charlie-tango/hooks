import { useCallback, useRef, useState } from 'react'

export type InteractionState = {
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

export type InteractionOptions = {
  skip?: boolean
  onInteraction?: (event: Event, state: InteractionState) => void
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
  'touchstart',
  'touchend',
]

const passiveEvents = { touchstart: true, touchend: true }

function eventReducer(state: InteractionState, event: Event) {
  switch (event.type) {
    case 'mouseenter':
      return { ...state, hover: true }
    case 'mouseleave':
      return { ...state, hover: false }
    case 'focus':
      return {
        ...state,
        focus: true,
        focusVisible: (event.target as HTMLElement).hasAttribute(
          'data-focus-visible-added',
        ),
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
        focusVisible: (event.target as HTMLElement).hasAttribute(
          'data-focus-visible-added',
        ),
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

function useInteraction({ skip, onInteraction }: InteractionOptions = {}): [
  (element: HTMLElement | null) => void,
  InteractionState,
] {
  const cleanup = useRef<Function | null>()
  const [state, setState] = useState(initial)

  const setRef = useCallback(
    (node) => {
      if (cleanup.current) {
        // Cleanup the last events a new `node` is passed in
        cleanup.current()
        cleanup.current = null
      }

      if (node && !skip) {
        const eventHandler = (event: Event) => {
          setState((currentState) => {
            const nextState = eventReducer(currentState, event)
            if (onInteraction) onInteraction(event, nextState)
            return nextState
          })
        }

        events.forEach((event) => {
          node.addEventListener(event, eventHandler, {
            passive: passiveEvents[event],
          })
        })
        cleanup.current = () => {
          events.forEach((event) => {
            node.removeEventListener(event, eventHandler)
          })
        }
      }
    },
    [onInteraction, skip],
  )

  return [setRef, state]
}

export default useInteraction
