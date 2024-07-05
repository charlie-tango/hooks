# useScript

With `useScript` you can lazy-load external third party scripts, that your
components might depend on. It checks if the requested `url` already exists and reuses it, instead of creating a new load request.

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/usescript--readme) demo.

## Installation

```sh
pnpm add @charlietango/use-script
```

## API

```js
const [ready, status] = useScript(url)
```

The hook returns an array, where the first value is a boolean indicating if the script is ready.
The second value is the current loading status, that will be one of the `ScriptStatus` values:

```ts
type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error'
```

## Example

```jsx
import React from 'react'
import { useScript } from '@charlietango/use-script'

const Component = () => {
  const [ready, status] = useScript('https://api.google.com/api.js')

  if (status === 'error') {
    return <div>Failed to load Google API</div>
  }

  return <div>Google API Ready: {ready}</div>
}

export default Component
```
