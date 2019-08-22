# useScript

With `useScript` you can lazy-load external third party scripts, that your
components might depend on. It checks if the requested `url` already exists it
reuses it, instead of creating a new load request.

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/usescript--readme) demo.

## Installation

```sh
yarn add @charlietango/use-script
```

## API

```js
const [ready, error] = useScript(url)
```

## Example

```js
import React from 'react'
import useScript from '@charlietango/use-script'

const Component = () => {
  const [scriptReady, scriptError] = useScript('https://api.google.com/api.js')

  if (scriptError) {
    return <div>Failed to load Google API Ready.</div>
  }

  return <div>Google API Ready: {scriptReady}</div>
}

export default Component
```
