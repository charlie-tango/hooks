import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import useWindowSize from './useWindowSize'

type Props = {}

const HookComponent = (props: Props) => {
  const { width, height } = useWindowSize()

  useEffect(() => {
    action('hook result')(`${width}x${height}`)
  }, [width, height])

  return (
    <strong>
      <code>
        {width}x{height}px
      </code>
    </strong>
  )
}

storiesOf('useWindowSize', module).add('Example', () => (
  <>
    <h1>Window Size</h1>
    <HookComponent />
  </>
))
