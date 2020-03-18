# useMouseClosestEdge

Get the closest corners in a given element relative to the current mouse position.

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/usemouseclosestedge--readme) demo.

## Installation

```sh
yarn add @charlietango/use-mouse-closest-edge
```

## API

```js
const output = useMouseClosestEdge()
```

## Example

```js
import React from 'react'
import useMouseClosestEdge from '@charlietango/use-mouse-closest-edge'

const Component = () => {
  const output = useMouseClosestEdge()
  return <div>{output}</div>
}

export default Component
```
