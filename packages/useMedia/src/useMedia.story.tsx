import React from 'react'
import useMedia from './useMedia'
import styled from 'styled-components'
import { QueryObject } from 'json2mq'
import { Story } from '@storybook/react/types-6-0'

type Props = {
  query: QueryObject
}

const Content = styled.div`
  border: 1px solid black;
  background: azure;
  padding: 1em;
`

const Template: Story<Props> = ({ query }) => {
  return (
    <Content>
      <strong>
        Query match:{' '}
        {useMedia(query) ? (
          <span role="img" aria-label="match">
            ✅
          </span>
        ) : (
          <span role="img" aria-label="no match">
            ❌
          </span>
        )}
      </strong>
      <pre>
        <code>{JSON.stringify(query, null, 2)}</code>
      </pre>
    </Content>
  )
}

export const Example = Template.bind({})
Example.args = {
  query: {
    maxWidth: 768,
  },
}

export const Example2 = Template.bind({})
Example2.args = {
  query: {
    minWidth: 768,
  },
}

export const Example3 = Template.bind({})
Example3.args = {
  query: {
    maxWidth: 1100,
    minWidth: 768,
  },
}
