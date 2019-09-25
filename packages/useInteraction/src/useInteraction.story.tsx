import React from 'react'
import useInteraction from './useInteraction'

export default {
  title: 'useInteraction',
}

export const Example = () => {
  const [ref, state] = useInteraction()
  return (
    <>
      <div
        ref={ref}
        style={{
          width: 200,
          height: 100,
          padding: 20,
          fontWeight: 600,
          borderRadius: 4,
          background: 'aquamarine',
        }}
        tabIndex={0}
        role="button"
      >
        Interactive element!
      </div>
      <code style={{ whiteSpace: 'pre' }}>
        Status:
        <br />
        <pre data-testid="output">{JSON.stringify(state, null, 2)}</pre>
      </code>
    </>
  )
}

export const FocusWithin = () => {
  const [ref, state] = useInteraction()

  return (
    <>
      <div
        ref={ref}
        style={{
          width: 200,
          height: 100,
          padding: 20,
          fontWeight: 600,
          borderRadius: 4,
          background: 'aquamarine',
        }}
      >
        <button>Button within</button>
      </div>
      <code style={{ whiteSpace: 'pre' }}>
        Status:
        <br />
        <pre data-testid="output">{JSON.stringify(state, null, 2)}</pre>
      </code>
    </>
  )
}
