import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import useClientHydrated from './useClientHydrated'

type Props = {}

const HookComponent = (props: Props) => {
  const result = useClientHydrated()

  useEffect(() => {
    action('hook result')(result)
  }, [result])

  return <code>Hook result: {result.toString()}</code>
}

storiesOf('useClientHydrated', module).add('Example', () => (
  <>
    <h1>Client hydrated</h1>
    <HookComponent />
    <p>
      This is false the first a component with the hook is rendered. On the
      second render it will be true. Try to navigate to another page, and come
      back.
    </p>
  </>
))
