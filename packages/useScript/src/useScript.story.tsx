import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import useScript from './useScript'

const ScriptComponent = () => {
  const ready = useScript('/js/external.js')
  useEffect(() => {
    action('script ready')(ready)
  }, [ready])
  return <code>Script ready: {ready.toString()}</code>
}

storiesOf('Hooks|useScript', module).add('External script', () => (
  <>
    <h1>Render the hook</h1>
    <ScriptComponent />
  </>
))
