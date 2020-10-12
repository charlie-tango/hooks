import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import useLazyRef from './useLazyRef'

type Props = {}

const HookComponent = (props: Props) => {
  const result = useLazyRef(() => ({ message: 'Lazy ref value' }))

  useEffect(() => {
    action('hook result')(result)
  }, [result])

  return <code>{JSON.stringify(result)}</code>
}

storiesOf('useLazyRef', module).add('Example', () => (
  <>
    <h1>Create a lazy ref value</h1>
    <HookComponent />
  </>
))
