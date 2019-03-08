# useToggle

Simple boolean state toggler

## Installation

```sh
yarn add @charlietango/use-toggle
```

## API

```js
const toggledInitially = false
const [isToggled, toggle] = useToggle(toggledInitially)
```

## Example

```js
import React from 'react'
import useToggle from '@charlietango/use-toggle'

const Component = () => {
  const [isToggled, toggle] = useToggle(true)
  return <button onClick={toggle}>{isToggled}</button>
}

export default Component
```
