import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import useScrollPercentage from './useScrollPercentage'
import styled, { createGlobalStyle } from 'styled-components'

type Props = {
  options?: IntersectionObserverInit
  horizontal?: boolean
}

const ScrollBlock = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: darkslateblue;
  color: white;
`

const Horizontal = styled.div`
  width: 300vw;
  display: flex;
`

const HTML = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

const HorizontalHTML = createGlobalStyle`
  html {
    overflow-x: scroll;
    overflow-y: hidden;
  }
`

const Content = styled.div`
  background: azure;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em 1em;
  min-width: 20vw;
  font-size: 2rem;
  flex: 1 1 auto;
`

const HookComponent = (props: Props) => {
  const [ref, percentage] = useScrollPercentage(props.options, props.horizontal)

  useEffect(() => {
    const debounced = setTimeout(() => {
      action('scroll')(percentage)
    }, 50)

    return () => {
      clearTimeout(debounced)
    }
  }, [percentage])

  return (
    <Content ref={ref}>
      <code>Percentage: {percentage.toPrecision(2)}</code>
    </Content>
  )
}

storiesOf('useScrollPercentage', module)
  .addDecorator(storyFn => (
    <>
      <HTML />
      {storyFn()}
    </>
  ))
  .add('Example vertical', () => (
    <>
      <ScrollBlock>
        <h1>Scroll down 👇</h1>
      </ScrollBlock>
      <HookComponent />
      <ScrollBlock>
        <h1>👆</h1>
      </ScrollBlock>
    </>
  ))
  .add('Example horizontal', () => (
    <Horizontal>
      <HorizontalHTML />
      <ScrollBlock>
        <h1>Scroll right 👉</h1>
      </ScrollBlock>
      <HookComponent horizontal />
      <ScrollBlock>
        <h1>👈</h1>
      </ScrollBlock>
    </Horizontal>
  ))
