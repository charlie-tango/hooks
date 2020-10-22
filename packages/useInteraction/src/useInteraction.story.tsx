import React from 'react'
import useInteraction, { InteractionState } from './useInteraction'
import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react/types-6-0'

type Props = {
  withButton?: boolean
  label: string
  skip?: boolean
  onInteraction?: (event: Event, state: InteractionState) => {} | null
}

const Template: Story<Props> = (args) => {
  const [ref, state] = useInteraction({
    skip: args.skip,
    onInteraction:
      args.onInteraction !== undefined
        ? args.onInteraction
        : (event, state) => action(event.type)(state),
  })

  return (
    <>
      <div
        ref={ref}
        style={{
          width: 200,
          height: 50,
          padding: 20,
          fontWeight: 600,
          borderRadius: 4,
          background: args.skip ? 'lightgrey' : 'aquamarine',
        }}
        tabIndex={0}
        role="button"
      >
        {args.withButton ? <button>{args.label}</button> : args.label}
      </div>
      <code style={{ whiteSpace: 'pre' }}>
        <pre data-testid="output">{JSON.stringify(state, null, 2)}</pre>
      </code>
    </>
  )
}

export const Example = Template.bind({})
Example.args = {
  withButton: false,
  label: 'Interactive element',
}

export const FocusWithin = Template.bind({})
FocusWithin.args = {
  withButton: true,
  label: 'Button within',
}

export const Skip = Template.bind({})
Skip.args = {
  withButton: false,
  label: 'Disabled',
  skip: true,
}
