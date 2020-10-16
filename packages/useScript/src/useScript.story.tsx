import React, { useEffect } from 'react'
import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react/types-6-0'
import useScript from './useScript'

type Props = {
  src: string
  options?: {
    attributes?: {
      [k: string]: string
    }
  }
}

const Template: Story<Props> = (args) => {
  const [ready, status] = useScript(args.src, args.options)
  useEffect(() => {
    action('script ready')(ready)
  }, [ready])

  return (
    <dl>
      <dt>Script source:</dt>
      <dd>
        <code>{args.src}</code>
      </dd>
      <dt>Status</dt>
      <dd>
        <code>{status}</code>
      </dd>
    </dl>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  src: '/js/external.js',
}
