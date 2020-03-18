# useMouseDirection

Get the mouse movement direction within a given element.

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/usemousedirection--readme) demo.

## Installation

```sh
yarn add @charlietango/use-mouse-direction
```

## API

```js
const output = useMouseDirection()
```

## Example

```js
import React from 'react'
import useMouseDirection from '@charlietango/use-mouse-direction'

const Component = () => {
  const output = useMouseDirection()
  return <div>{output}</div>
}

export default Component
```
