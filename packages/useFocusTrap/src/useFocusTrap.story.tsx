import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import useFocusTrap from './useFocusTrap'

type Props = {
  children?: React.ReactNode
}

type ModalProps = {
  onClose: () => void
}

const HookComponent = (props: Props) => {
  const [active, setActive] = useState(false)
  const ref = useFocusTrap(active)

  return (
    <div
      ref={ref}
      style={{ border: '1px solid grey', padding: '0.5rem', margin: '1rem 0' }}
    >
      <button onClick={() => setActive(!active)}>
        {!active ? 'Activate' : 'Deactivate'} focus trap
      </button>
      {props.children}
    </div>
  )
}

const Modal = ({ onClose }: ModalProps) => {
  const focusTrapRef = useFocusTrap()
  return (
    <div
      ref={focusTrapRef}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      aria-label="Information about root element focus"
      style={{
        position: 'fixed',
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
        In this example, the root element — the modal — has the focus, since the
        modal doesn't contain any valid focusable items.
      </p>
    </div>
  )
}

const RootFocusExample = () => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <button
        onClick={() => setShowModal(!showModal)}
        style={{ margin: '50px ' }}
      >
        Toggle modal
      </button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  )
}

storiesOf('useFocusTrap', module)
  .add('Example', () => (
    <>
      <input name="outside" placeholder="Outer input" />
      <HookComponent>
        <label style={{ display: 'block' }}>
          <input name="outside" placeholder="Inner input" />
        </label>
      </HookComponent>
      <input name="outside3" placeholder="Outer input" />
    </>
  ))
  .add('With root element focusable', () => <RootFocusExample />)
