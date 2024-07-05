# useLazyRef

Create a new ref with lazy instantiated value.

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/uselazyref--readme) demo.

This is just a clean reusable helper hook for the common boilerplate:

```js
const value = useRef()
if (!value.current) value.current = init()
```

## Installation

```sh
pnpm add @charlietango/use-lazy-ref
```

## API

```ts
const result = useLazyRef(() => Result)
```

Once the value has been instantiated, you cannot reset it without recreating the component.

## Example

A common use case is creating single instance objects, like the Apollo client.
This ensures the client gets created during the first render, and reused in all the following calls.

```jsx
import React from 'react'
import { useLazyRef } from '@charlietango/use-lazy-ref'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'

const Apollo = () => {
  const client = useLazyRef(
    () => new ApolloClient({ link: createHttpLink({ uri: '/graphql' }) }),
  )

  return <ApolloProvider client={client.current}>{children}</ApolloProvider>
}
```
