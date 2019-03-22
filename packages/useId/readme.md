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

When using this as the `id` for an HTML element, make sure you prefix it with fixed string value - otherwise you'll create a global `id` that's just a number.

```js
import React from 'react'
import useId, { IdProvider } from '@charlietango/use-id'

const LoginForm = () => {
  const id = useId()
  const inputId = `input-${id}`
  const passwordId = `pass-${id}`

  return (
    <form>
      <label htmlFor={inputId}>Username:</label>
      <input id={inputId} />
      <label htmlFor={passwordId}>Password:</label>
      <input
        type="password"
        id={passwordId}
        aria-describedby={passwordId + '-desc'}
      />
      <p role="alert" id={passwordId + '-desc'}>
        Please enter a password.
      </p>
    </form>
  )
}

const App = () => {
  return (
    <IdProvider>
      <LoginForm />
    </IdProvider>
  )
}

export default App
```
