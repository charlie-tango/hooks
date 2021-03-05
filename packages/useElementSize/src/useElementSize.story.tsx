import React, { CSSProperties } from 'react'
import { Story } from '@storybook/react/types-6-0'
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
  overflow: auto;
  resize: both;
`

const Template: Story<Props> = (args) => {
  const [ref, size] = useElementSize()

  return (
    <Content ref={ref} style={args.style}>
      <pre style={{ padding: '1rem', margin: 0 }}>
        <code>{JSON.stringify(size, null, 2)}</code>
      </pre>
    </Content>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  style: {
    height: 200,
    width: 200,
  },
}

export const MaxWidth = Template.bind({})
MaxWidth.args = {
  style: {
    maxWidth: 500,
  },
}

export const PaddingBottom = Template.bind({})
PaddingBottom.args = {
  style: {
    width: 200,
    paddingBottom: 300,
  },
}
