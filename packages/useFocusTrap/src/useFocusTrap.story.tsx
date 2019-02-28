import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import useFocusTrap from './useFocusTrap'

type Props = {}

const HookComponent = (props: Props) => {
  const [active, setActive] = useState(false)
  const ref = useFocusTrap(active)

  return (
    <div ref={ref}>
      <button onClick={() => setActive(!active)}>
        {!active ? 'Activate' : 'Deactivate'} focus trap
      </button>
    </div>
  )
}

storiesOf('useFocusTrap', module).add('Example', () => (
  <>
    <input name="outside" />
    <HookComponent />
    <input name="outside3" />
  </>
))
