import * as React from 'react'
import { addDecorator, configure } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import { withViewport } from '@storybook/addon-viewport'
import pck from '../../package.json'

addDecorator(
  withOptions({
    name: 'Hooks',
    url: pck.repository ? pck.repository.url : null,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  }),
)

addDecorator(withViewport())

// automatically import all files ending in *.story.js
const req = require.context('../../packages', true, /.story.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
