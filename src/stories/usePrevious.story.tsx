import React from 'react'
import { storiesOf } from '@storybook/react'
import readme from '../docs/usePrevious.md'
import { Doc } from './components/Doc'

storiesOf('Hooks|usePrevious', module).add('readme', () => (
  <>
    <Doc input={readme} />
  </>
))
