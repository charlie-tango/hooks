import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore
import { tomorrow } from 'react-syntax-highlighter/dist/styles/prism'
import 'github-markdown-css'

export const StyledMarkdown = styled(ReactMarkdown)`
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;

  @media (max-width: 767px) {
    padding: 15px;
  }
`

type Props = {
  input: string
}

type CodeBlockProps = {
  value: string
  language: string | null
}

const CodeBlock = ({ value, language }: CodeBlockProps) => (
  <SyntaxHighlighter language={language} style={tomorrow}>
    {value}
  </SyntaxHighlighter>
)

/**
 * Render a Github styled Markdown block
 * @param input
 * @constructor
 */
export function Doc({ input }: Props) {
  return (
    <StyledMarkdown
      source={input}
      renderers={{ code: CodeBlock }}
      className="markdown-body"
    />
  )
}
