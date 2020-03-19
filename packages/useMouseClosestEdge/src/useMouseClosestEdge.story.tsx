import React, { useEffect } from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import useMouseClosestEdge from './useMouseClosestEdge'

type Props = {}

const style: React.CSSProperties = {
  position: 'relative',
  height: 200,
  width: 200,
  margin: '15px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '3px solid #ccc',
}

const HookComponent = (props: Props) => {
  const [ref, position] = useMouseClosestEdge()
  const { x, y } = position

  const yPosition = y === 0 ? '' : y === 1 ? 'top' : 'bottom'
  const xPosition = x === 0 ? '' : x === 1 ? 'left' : 'right'

  useEffect(() => action('position', { limit: 10 })(x, y), [x, y])

  return (
    <>
      Hover for position:
      <div ref={ref} style={style}>
        {yPosition + ' ' + xPosition}
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
