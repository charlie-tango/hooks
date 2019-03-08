import React from 'react'
import { storiesOf } from '@storybook/react'
import useToggle from './useToggle'

const HookComponent = () => {
  const [isToggled, toggle] = useToggle(true)
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      {isToggled ? 'true' : 'false'}
    </>
  )
}

storiesOf('useToggle', module).add('Example', () => <HookComponent />)
