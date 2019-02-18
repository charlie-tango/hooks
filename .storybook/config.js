import { addDecorator, configure } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import pck from '../package.json'

addDecorator(
  withOptions({
    name: 'Hooks',
    url: pck.repository ? pck.repository.url : null,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  }),
)

/**
 * Use require.context to load dynamically: https://webpack.github.io/docs/context.html
 */
const req = require.context('../src', true, /story\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
