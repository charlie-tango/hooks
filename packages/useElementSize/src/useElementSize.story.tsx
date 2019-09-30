import React, { CSSProperties } from 'react'
import { storiesOf } from '@storybook/react'
import useElementSize from './useElementSize'
import styled from 'styled-components'

type Props = {
  style?: CSSProperties
}

const Content = styled.div`
  border: 2px dashed black;
  background: azure;
  padding: 0;
  margin-bottom: 2rem;
`

const HookComponent = ({ style }: Props) => {
  const [ref, size] = useElementSize()

  return (
    <Content ref={ref} style={style}>
      <pre style={{ padding: '1rem', margin: 0 }}>
        <code>{JSON.stringify(size, null, 2)}</code>
      </pre>
    </Content>
  )
}

storiesOf('useElementSize', module).add('Example', () => (
  <>
    <h1>Element sizes</h1>
    <HookComponent style={{ height: 200, width: 200 }} />
    <HookComponent style={{ maxWidth: 500 }} />
    <HookComponent style={{ width: 200, paddingBottom: 300 }} />
    <HookComponent />
  </>
))
