# useClientHydrated

Check if the client has been hydrated. This hook only informs you of the current hydration state, and
doesn't trigger a new render once the client becomes hydrated. To check that, you'd combine it with
a `useEffect` to trigger a new render.

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

```jsx
import React, { useEffect, useState } from 'react'
import useClientHydrated from '@charlietango/use-client-hydrated'

const Component = () => {
  const hydrated = useClientHydrated()

  // Set the initial ready state based on hydrated. Will be `false` first time the component is rendered, but true after hydration.
  const [ready, setReady] = useState(hydrated)

  useEffect(() => {
    // We have been hydrated correctly now
    setReady(true)
  }, [])

  return <div>{ready ? 'Hydrated' : 'Hydrating'}</div>
}

export default Component
```
