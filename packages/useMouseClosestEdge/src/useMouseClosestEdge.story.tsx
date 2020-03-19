import React, { useEffect } from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import useMouseClosestEdge from './useMouseClosestEdge'

type Props = {
}

const style: React.CSSProperties = {
  position: 'relative',
  height: 200,
  width: 200,
  marginBottom: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '3px solid #ccc'
}

const HookComponent = (props:Props) => {
  const [ref, position] = useMouseClosestEdge()
  const { x, y } = position

  const centered = x === 0 && y === 0
  const yMovement = y === 0 ? '' : (y < 0 ? 'bottom' : 'top')
  const xMovement = x === 0 ? '' : (x < 0 ? 'right' : 'left')

  useEffect(() => {
    action('position', { limit: 10 })(x, y)
  }, [x, y])

  return (
    <>
   <div
    ref={ref}
    style={style}>
      {centered ? '' : yMovement + ' ' + xMovement}
    </div>
    <code>
      position:
      <pre>{JSON.stringify(position, null, 2)}</pre>
    </code>
    </>
  )
}

storiesOf('useMouseClosestEdge', module).add('Example', () => (
  <>
    <h1>useMouseClosestEdge</h1>
    <HookComponent />
  </>
))