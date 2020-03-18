import React, { useEffect } from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import useMouseClosestEdge from './useMouseClosestEdge'

type Props = {
}

const HookComponent = (props:Props) => {
  const [ref, position] = useMouseClosestEdge()
  const { x, y } = position

  const noMovement = x === 0 && y === 0
  const yMovement = y === 0 ? '' : (y > 0 ? 'bottom' : 'top')
  const xMovement = x === 0 ? '' : (x > 0 ? 'left' : 'right')

  useEffect(() => {
    action('direction', { limit: 10 })(x, y)
  }, [x, y])

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
    borderRadius: '5px'
    // borderColor: `
    //   ${yMovement === 'up' ? 'green' : '#ccc'}
    //   ${xMovement === 'right' ? 'green' : '#ccc'}
    //   ${yMovement === 'down' ? 'green' : '#ccc'}
    //   ${xMovement === 'left' ? 'green' : '#ccc'}`
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