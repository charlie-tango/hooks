import React from 'react'
import { storiesOf } from '@storybook/react'
import useMedia from './useMedia'
import styled from 'styled-components'
import { QueryObject } from 'json2mq'

type Props = {
  query: QueryObject
}

const Content = styled.div`
  border: 1px solid black;
  background: azure;
  padding: 1em;
  margin-bottom: 2rem;
`

const HookComponent = ({ query }: Props) => {
  const matches = useMedia(query)

  return (
    <Content>
      <strong>Query match: {matches.toString()}</strong>
      <pre>
        <code>{JSON.stringify(query, null, 2)}</code>
      </pre>
    </Content>
  )
}

storiesOf('useMedia', module).add('Example', () => (
  <>
    <h1>Media queries</h1>
    <HookComponent query={{ maxWidth: 768 }} />
    <HookComponent query={{ minWidth: 767 }} />
    <HookComponent query={{ minWidth: 767, maxWidth: 1100 }} />
  </>
))
