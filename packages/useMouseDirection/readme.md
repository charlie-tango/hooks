# useMouseDirection

Get the mouse movement direction within a given element.

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

|       | -1   | 0      | 1     |
| ----- |:-----:|:-----:| -----:|
| X     | right | -     | left
| Y     | up    | -     | down

## Example

```js
import React from 'react'
import useMouseDirection from '@charlietango/use-mouse-direction'

const Component = () => {
  const [ref, direction] = useMouseDirection()
  const { x, y } = direction
  const yMovement = y === 0 ? '' : (y > 0 ? 'up' : 'down')
  const xMovement = x === 0 ? '' : (x > 0 ? 'left' : 'right')
  return <div ref={ref}>{xMovement} {yMovement}</div>
}

export default Component
```
