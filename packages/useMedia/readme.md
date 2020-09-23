# useMedia

Detect if the browser matches a media query.

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/usemedia--readme) demo.

## Installation

```sh
yarn add @charlietango/use-media
```

## API

```js
const matches = useMedia(query)
```

The `query` can either be a CSS media query, or an object with he media query
properties.

## Example

```jsx
import React from 'react'
import useMedia from '@charlietango/use-media'

const Component = () => {
  const matches = useMedia({ minWidth: 768 })
  return <div>{matches}</div>
}

export default Component
```
