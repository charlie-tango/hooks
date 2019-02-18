# useScript

With `useScript` you can lazy-load external third party scripts, that your
components might depend on. It checks if the requested `url` already exists it
reuses it, instead of creating a new load request.

## API

```js
const ready = useScript(url)
```

## Example

```jsx harmony
import * as React from 'react'
import { useScript } from '@charlietango/hooks'

const Component = () => {
  const scriptReady = useScript('https://api.google.com/api.js')
  return <div>Google API Ready: {scriptReady}</div>
}

export default Component
```
