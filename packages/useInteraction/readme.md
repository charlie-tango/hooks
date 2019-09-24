# useInteraction

Monitor the user interactions on an element

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/useinteraction--readme) demo.

## Installation

```sh
yarn add @charlietango/use-interaction
```

## API

```js
const [ref, status] = useInteraction()
```

The hook returns an Array with a `ref` function, and the current interaction `status`.
Assign the `ref` to the element you want to monitor.

### `status`

The status is an object containing a boolean for each of the following properties:

- `active`
- `focus`
- `focusKeyboard` - If you're using https://github.com/WICG/focus-visible/ then `focusKeyboard`
  will also be set, to let you know if the focus is caused by the keyboard.
- `hover`

## Example

```js
import React from 'react'
import useInteraction from '@charlietango/use-interaction'

const Component = () => {
  const [ref, status] = useInteraction()
  return <div ref={ref}>Hovering: {status.hover}</div>
}

export default Component
```
