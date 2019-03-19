import React from 'react'
import { storiesOf } from '@storybook/react'
import useId, { IdProvider } from './useId'

type Props = { prefix?: string }

const Id = ({ prefix }: Props) => {
  const id = useId(prefix)
  return <p>{id}</p>
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
    </>
  ))
