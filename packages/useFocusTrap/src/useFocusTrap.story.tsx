import React, { useState } from 'react'
import useFocusTrap from './useFocusTrap'

export const Example = () => {
  const [active, setActive] = useState(false)
  const ref = useFocusTrap(active)

  return (
    <>
      <input name="outside" placeholder="Outer input" />
      <div
        ref={ref}
        style={{
          border: '1px solid grey',
          padding: '0.5rem',
          margin: '1rem 0',
        }}
      >
        <button onClick={() => setActive(!active)}>
          {!active ? 'Activate' : 'Deactivate'} focus trap
        </button>
        <label style={{ display: 'block' }}>
          <input name="outside" placeholder="Inner input" />
        </label>
      </div>
      <input name="outside3" placeholder="Outer input" />
    </>
  )
}

export const WithRootFocus = () => {
  const focusTrapRef = useFocusTrap()
  const [showModal, setShowModal] = React.useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(!showModal)}
        style={{ margin: '50px ' }}
      >
        Toggle modal
      </button>
      {showModal && (
        <div
          ref={focusTrapRef}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          aria-label="Information about root element focus"
          style={{
            position: 'fixed',
            zIndex: 2,
            top: '50%',
            left: '50%',
            width: '400px',
            background: 'white',
            padding: '20px 40px',
            border: '1px solid #ddd',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 3px 4px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          <p>
            In this example, the root element — the modal — has the focus, since
            the modal doesn't contain any valid focusable items.
          </p>
        </div>
      )}
    </>
  )
}
