import * as React from 'react'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { create } from '@storybook/theming'
import pck from '../../package.json'
import 'github-markdown-css'
import { createGlobalStyle } from 'styled-components'

const GithubCss = createGlobalStyle`
  html {
    font-family: system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  
  .markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 28px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 0;
		}
	}
`

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Hooks',
      brandUrl: pck.repository ? pck.repository.url : null,
    }),
    isFullscreen: false,
    panelPosition: 'bottom',
  },
})

addDecorator(storyFn => (
  <>
    <GithubCss suppressMultiMountWarning />
    {storyFn()}
  </>
))

require('./readme.story')

// automatically import all files ending in *.story.js
const req = require.context('../../packages', true, /.story.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
