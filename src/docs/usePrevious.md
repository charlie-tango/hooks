# usePrevious

If you need to get a value from the previous hook update. This code is based on
the example from the
[official docs](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state).

## API

```js
const previous = usePrevious(value)
```

## Example

```typescript jsx
import React, { useState } from 'react'
import { usePrevious } from '@charlietango/hooks'

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  )
}

export default Counter
```
