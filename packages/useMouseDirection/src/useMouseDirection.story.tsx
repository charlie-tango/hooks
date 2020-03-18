import React, { useEffect, useRef } from 'react'
import useMouseDirection, { Direction } from './useMouseDirection'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

type Props = {
}

const HookComponent = (props:Props) => {
  const [ref, direction] = useMouseDirection()
  const { x, y } = direction as Direction

  const noMovement = x === 0 && y === 0
  const yMovementLabel = y === 0 ? '' : (y > 0 ? 'up' : 'down')
  const xMovementLabel = x === 0 ? '' : (x > 0 ? 'left' : 'right')

  useEffect(() => {
    action('direction', { limit: 10 })(x, y)
  }, [x, y])

  return (
   <div
    ref={ref}
    style={{
      position: 'absolute',
      height: 200,
      width: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #333',
      transition: 'transform 200ms linear'
    }}>
      {noMovement ? 'No Movement' : yMovementLabel + ' ' + xMovementLabel}
    </div>
  )
}

storiesOf('useMouseDirection', module).add('Example', () => (
  <>
    <h1>useMouseDirection</h1>
    <HookComponent />
  </>
))
