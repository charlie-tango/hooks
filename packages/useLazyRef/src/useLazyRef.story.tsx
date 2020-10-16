import React from 'react'
import useLazyRef from './useLazyRef'
import { Story } from '@storybook/react/types-6-0'

type Props = {
  value: string
}

const Template: Story<Props> = (args) => {
  const result = useLazyRef(() => args.value)

  return <code>{result}</code>
}

export const Example = Template.bind({})
Example.args = {
  value: 'Lazy ref value',
}
