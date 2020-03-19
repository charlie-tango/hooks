# useClientHydrated

Check if the client has been hydrated

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/useclienthydrated--readme) demo.

## Installation

```sh
yarn add @charlietango/use-client-hydrated
```

## API

```js
const output = useClientHydrated()
```

## Example

```js
import React from 'react'
import useClientHydrated from '@charlietango/use-client-hydrated'

const Component = () => {
  const clientHydrated = useClientHydrated()
  let innerWidth = 0
  if (clientHydrated) {
    // It's safe to read from window, and other client only fields
    innerWidth = window.innerWidth
  }
  return <div>Window width {innerWidth}</div>
}

export default Component
```
