# useInteraction

Monitor the user interactions on an element

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/useinteraction--readme) demo.

## Installation

```sh
yarn add @charlietango/use-interaction
```

> If the application is using the [focus-visible](https://github.com/WICG/focus-visible/) polyfill,
> then the class it adds will be detected and used to report the status of `focusVisible`.

## API

```js
const [ref, status] = useInteraction(options)
```

The hook returns an Array with a `ref` function, and the current interaction `status`.
Assign the `ref` to the element you want to monitor.

### `status`

The status is an object containing a `boolean` for each of the following properties:

- `active` - The user is currently pressing the element, either with the mouse or touch
- `focus` - The element has focus
- `focusVisible` - The focus outline shouldn't be shown - Enabled if using `focus-visible` polyfill
- `focusWithin` - An element inside this element currently has focus. This will also affect `focusVisible`
- `hover` - The user is hovering over the element with the mouse, or it was touched and still has focus

### Options

The `useInteraction` hook accepts an object with these optional options, that give you a bit more control.

| Name              | Type                      | Default     | Required | Description                                                                                                                                                  |
| ----------------- | ------------------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **onInteraction** | `(event, status) => void` | `undefined` | false    | Callback function that's triggered whenever an interaction event occurs. Receives the new `status`. Make sure this function is memorized with `useCallback`. |
| **skip**          | `boolean`                 | `false`     | false    | Skip adding any event listeners.                                                                                                                             |

## Example

```jsx
import React from 'react'
import useInteraction from '@charlietango/use-interaction'

const Component = () => {
  const [ref, status] = useInteraction()
  return <div ref={ref}>Hovering: {status.hover}</div>
}

export default Component
```

### With callback

```jsx
import React from 'react'
import useInteraction from '@charlietango/use-interaction'

const Component = () => {
  const onInteraction = React.useCallback((event, status) => {
    // Log out the latest event
    console.log(event.type, status)
  }, [])

  const [ref, status] = useInteraction({ onInteraction })

  return <div ref={ref}>Hovering: {status.hover}</div>
}

export default Component
```
