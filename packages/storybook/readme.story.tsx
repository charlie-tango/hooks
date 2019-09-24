import { storiesOf } from '@storybook/react'
import { doc } from 'storybook-readme'
import readme from '../../README.md'

const stories = storiesOf('Hooks', module)
// @ts-ignore
stories.add('Readme', doc(readme))

const docs = require.context('../../packages', true, /readme.md$/)
docs.keys().forEach(name => {
  const docName = name.replace(/\.\/(.+?)\/readme.md$/, '$1')
  if (docName.startsWith('use')) {
    const data = docs(name)
    // @ts-ignore
    storiesOf(docName, module).add('Readme', doc(data.default))
  }
})
