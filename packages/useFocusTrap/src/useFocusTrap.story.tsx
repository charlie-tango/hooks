import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import useFocusTrap from './useFocusTrap'

type Props = {
  children?: React.ReactNode
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

storiesOf('useFocusTrap', module).add('Example', () => (
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
