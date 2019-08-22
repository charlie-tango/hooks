import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import useScript from './useScript'

const ScriptComponent = () => {
  const [ready, status] = useScript('/js/external.js')
  useEffect(() => {
    action('script ready')(ready)
  }, [ready])
  return <code>Script status: {status}</code>
}

storiesOf('useScript', module).add('Example', () => (
  <>
    <h1>Render the hook</h1>
    <ScriptComponent />
  </>
))
