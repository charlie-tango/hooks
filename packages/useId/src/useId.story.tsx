import React from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('useId', module)
  .addDecorator(storyFn => <IdProvider>{storyFn()}</IdProvider>)
  .add('Example', () => (
    <>
      <h1>Render the ids</h1>
      <Id />
      <Id />
      <Id />
      <Id />
      <h2>With prefix</h2>
      <Id prefix="prefix" />
      <Id prefix="prefix" />
      <Id prefix="prefix" />
      <h2>Login</h2>
      <LoginForm />
    </>
  ))
