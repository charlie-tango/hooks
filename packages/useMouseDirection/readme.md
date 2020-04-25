# useMouseDirection

Get the direction of mouse movement within an element.

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/usemousedirection--readme) demo.

## Installation

```sh
yarn add @charlietango/use-mouse-direction
```

## API

```js
const [ref, direction] = useMouseDirection()
```

### `direction`

|     |   X   |  Y   |
| --- | :---: | :--: |
| 1   | left  |  up  |
| 0   |   -   |  -   |
| -1  | right | down |

## Example

```js
import React from 'react'
import useMouseDirection from '@charlietango/use-mouse-direction'

const Component = () => {
  const [ref, direction] = useMouseDirection()
  const { x, y } = direction
  const yMovement = y === 0 ? '' : y === 1 ? 'up' : 'down'
  const xMovement = x === 0 ? '' : x === 1 ? 'left' : 'right'
  return (
    <div ref={ref}>
      {xMovement} {yMovement}
    </div>
  )
}

export default Component
```
