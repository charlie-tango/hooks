import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Doc } from './components/Doc'
import readme from '../docs/useScript.md'
import { useScript } from '../hooks/useScript'

const ScriptComponent = () => {
  const ready = useScript('/js/external.js')
  useEffect(() => {
    action('script')(ready)
  }, [ready])
  return null
}

storiesOf('Hooks|useScript', module).add('readme', () => (
  <>
    <Doc input={readme} />
    <ScriptComponent />
  </>
))
