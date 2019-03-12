# useWindowSize

Get the width and height of the viewport.

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/usewindowsize--readme) demo.

## Installation

```sh
yarn add @charlietango/use-window-size
```

## API

```js
const { width, height } = useWindowSize(clientOnly)
```

By default the value is lazy to support SSR, so the `width` and `height` will always be `0` on the initial render
If you know it will only be rendered on the client, then you can set `clientOnly` to `true`.
This sets the `width` and `height` on the initial render,

## Example

```js
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
