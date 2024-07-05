# %name%

%description%

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/%lowercaseName%--readme) demo.

## Installation

```sh
pnpm add %packageName%
```

## API

```js
const output = %name%()
```

## Example

```jsx
import React from 'react'
import { %name% } from '%packageName%'

const Component = () => {
  const output = %name%()
  return <div>{output}</div>
}

export default Component
```
