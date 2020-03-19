# useMouseClosestEdge

Get the closest edge within an element relative to the mouse position.

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

|       | X     | Y      |
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
  const yPosition = y === 0 ? '' : (y === 1 ? 'top' : 'bottom')
  const xPosition = x === 0 ? '' : (x === 1 ? 'right' : 'left')
  return <div ref={ref}>{xPosition} {yPosition}</div>
}

export default Component
```