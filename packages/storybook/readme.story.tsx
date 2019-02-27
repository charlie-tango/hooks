import { storiesOf } from '@storybook/react'
import { doc } from 'storybook-readme'
import readme from '../../README.md'

const stories = storiesOf('Hooks', module)
stories.add('Readme', doc(readme))

const docs = require.context('../../packages', true, /readme.md$/)
docs.keys().forEach(name => {
  const docName = name.replace(/\.\/(.+?)\/readme.md$/, '$1')
  const data = docs(name)
  storiesOf(docName, module).add('Readme', doc(data))
})
