# useId

Generate a deterministic id using a `ContextProvider`.
Use this as a way of generating unique id's for input fields, or linking aria fields.

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/useid--readme) demo.

## Installation

```sh
yarn add @charlietango/use-id
```

## API

```js
const id = useId(prefix?: string)
```

## Example

The `useId` hook requires the application to be wrapped in the `IdProvider`.
This is ensures that the generated id's are deterministic, since it's created once for each instance of the application.

```js
import React from 'react'
import useId, { IdProvider } from '@charlietango/use-id'

const InputField = () => {
  const id = useId()
  return <input id={id}>{output}</input>
}

const App = () => {
  return (
    <IdProvider>
      <InputField />
    </IdProvider>
  )
}

export default App
```
