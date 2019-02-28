# useFocusTrap

Trap keyboard focus inside a DOM element, to prevent the user navigating outside a modal.
When using this, make sure to combine it with a fixed position `<Backdrop>` that prevents the mouse from clicking input elements.

## Installation

```sh
yarn add @charlietango/use-focus-trap
```

## API

```js
const ref = useFocusTrap(active, options)
```

## Example

```js
import React from 'react'
import useFocusTrap from '@charlietango/use-focus-trap'

const Component = () => {
  const ref = useFocusTrap()
  return (
    <div ref={ref}>
      <button>Trapped to the button</button>
    </div>
  )
}

export default Component
```
