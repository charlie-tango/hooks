import React, { useEffect } from 'react'
import { action } from '@storybook/addon-actions'
import useWindowSize from './useWindowSize'

export const WindowSize = () => {
  const { width, height } = useWindowSize()

  useEffect(() => {
    action('hook result')(`${width}x${height}`)
  }, [width, height])

  return (
    <code>
      Viewport size:
      <strong> {width}</strong>x<strong>{height}</strong>
    </code>
  )
}
