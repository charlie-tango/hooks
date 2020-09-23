# useScript

With `useScript` you can lazy-load external third party scripts, that your
components might depend on. It checks if the requested `url` already exists it
reuses it, instead of creating a new load request.

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/usescript--readme) demo.

## Installation

```sh
yarn add @charlietango/use-script
```

## API

```js
const [ready, status] = useScript(url)
```

The hook returns an array, where the first value is a boolean indicating if the script is ready.
The second value is the current loading status, that will be one of the `ScriptStatus` enum values:

```ts
enum ScriptStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  READY = 'loaded',
  ERROR = 'error',
}
```

## Example

```jsx
import React from 'react'
import useScript, { ScriptStatus } from '@charlietango/use-script'

const Component = () => {
  const [ready, status] = useScript('https://api.google.com/api.js')

  if (status === ScriptStatus.ERROR) {
    return <div>Failed to load Google API</div>
  }

  return <div>Google API Ready: {ready}</div>
}

export default Component
```
