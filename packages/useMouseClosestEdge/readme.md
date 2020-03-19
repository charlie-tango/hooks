# useMouseClosestEdge

Get the closest edge in a given element relative to the current mouse cursor position.

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/usemouseclosestedge--readme) demo.

## Installation

```sh
yarn add @charlietango/use-mouse-closest-edge
```

## API

```js
const [ref, position] = useMouseClosestEdge()
```

### `position`

|       | X   | Y        |
| ----- |:-----:|:------:|
| 1     | left  | top    |
| 0     | -     | -      |
| -1    | right | bottom |

## Example

```js
import React from 'react'
import useMouseClosestEdge from '@charlietango/use-mouse-closest-edge'

const Component = () => {
  const [ref, position] = useMouseClosestEdge()
  const { x, y } = position
  const yMovement = y === 0 ? '' : (y > 0 ? 'up' : 'down')
  const yPosition = x === 0 ? '' : (x > 0 ? 'left' : 'right')
  return <div ref={ref}>{xPosition} {yPosition}</div>
}

export default Component
```