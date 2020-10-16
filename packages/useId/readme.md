# useId

Generate a deterministic id using a `ContextProvider`.
Use this as a way of generating unique ids for input fields, or linking aria fields.

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/useid--readme) demo.

## Installation

```sh
yarn add @charlietango/use-id
```

## API

```js
const id = useId(prefix?: string)
```

The `useId` hook should ideally be wrapped with the `IdProvider`.
This ensures that the generated ids are deterministic, since the provider gets created once for each instance of the application.

The hook will revert to generating the `id` as a side effect if the `IdProvider` is not included. This means you will get back `undefined` during the initial render.

> ⚠️ When using the hook to generate an `id` for an HTML element, make sure you prefix it with fixed string value - otherwise you'll create a global `id` that's just a number.

## Example

```jsx
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
