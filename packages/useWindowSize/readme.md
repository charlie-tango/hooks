# useWindowSize

Get the width and height of the viewport.

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/usewindowsize--readme) demo.

## Installation

```sh
yarn add @charlietango/use-window-size
```

## API

```js
const { width, height } = useWindowSize()
```

By default, the value is lazy to support SSR, so the `width` and `height` will always be `0` on the initial render.
Subsequent users of the hook will return the size during the first render.

## Example

```jsx
import React from 'react'
import useWindowSize from '@charlietango/use-window-size'

const Component = () => {
  const { width, height } = useWindowSize()

  return (
    <div>
      {width}x{height}px
    </div>
  )
}

export default Component
```
