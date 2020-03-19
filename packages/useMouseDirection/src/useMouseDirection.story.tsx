import React, { useEffect } from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import useMouseDirection from './useMouseDirection'

type Props = {
}

const HookComponent = (props:Props) => {
  const [ref, direction] = useMouseDirection()
  const { x, y } = direction

  useEffect(() => action('direction', { limit: 10 })(x, y), [x, y])

  const noMovement = x === 0 && y === 0
  const yMovement = y === 0 ? '' : (y > 0 ? 'up' : 'down')
  const xMovement = x === 0 ? '' : (x > 0 ? 'left' : 'right')

  const style: React.CSSProperties = {
    position: 'relative',
    height: 200,
    width: 200,
    marginBottom: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderColor: `
      ${yMovement === 'up' ? 'green' : '#ccc'}
      ${xMovement === 'right' ? 'green' : '#ccc'}
      ${yMovement === 'down' ? 'green' : '#ccc'}
      ${xMovement === 'left' ? 'green' : '#ccc'}`
  }

  return (
    <>
   <div
    ref={ref}
    style={style}>
      {noMovement ? 'No Movement' : yMovement + ' ' + xMovement}
    </div>
    <code>
      direction:
      <pre>{JSON.stringify(direction, null, 2)}</pre>
    </code>
    </>
  )
}

storiesOf('useMouseDirection', module).add('Example', () => (
  <>
    <h1>useMouseDirection</h1>
    <HookComponent />
  </>
))
