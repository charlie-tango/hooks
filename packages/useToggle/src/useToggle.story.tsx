import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import useToggle from './useToggle'

type Props = {
  initialValue: boolean
}

const Template: Story<Props> = (args) => {
  const [isToggled, toggle] = useToggle(args.initialValue)
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <p>
        <code>
          isToggled:
          <strong>{isToggled ? 'true' : 'false'}</strong>
        </code>
      </p>
    </>
  )
}

export const Off = Template.bind({})
Off.args = {
  initialValue: false,
}

export const On = Template.bind({})
On.args = {
  initialValue: true,
}
