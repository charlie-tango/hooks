import React from 'react'
import useId, { IdProvider } from './useId'

type Props = { prefix?: string }

const Id = ({ prefix }: Props) => {
  const id = useId(prefix)
  return <p>{id}</p>
}

const LoginForm = () => {
  const id = useId()
  const inputId = `input-${id}`
  const passwordId = `pass-${id}`

  return (
    <form>
      <div>
        <label htmlFor={inputId}>Username:</label>
        <input id={inputId} />
      </div>
      <div>
        <label htmlFor={passwordId}>Password:</label>
        <input
          type="password"
          id={passwordId}
          aria-describedby={passwordId + '-desc'}
        />
        <p role="alert" id={passwordId + '-desc'}>
          Please enter a password.
        </p>
      </div>
    </form>
  )
}

export const ExampleWithProvider = () => (
  <IdProvider>
    <h3>
      With <code>IdProvider</code>
    </h3>
    <Id />
    <Id />
    <Id />
    <Id />
    <h4>With prefix</h4>
    <Id prefix="prefix" />
    <Id prefix="prefix" />
    <Id prefix="prefix" />
    <h4>Login</h4>
    <LoginForm />
  </IdProvider>
)

export const ExampleWithoutProvider = () => (
  <>
    <h3>Without provider</h3>
    <Id />
    <Id />
    <Id />
    <Id />
    <h4>With prefix</h4>
    <Id prefix="prefix" />
    <Id prefix="prefix" />
    <Id prefix="prefix" />
    <h4>Login</h4>
    <LoginForm />
  </>
)
