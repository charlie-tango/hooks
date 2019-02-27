const globby = require('globby')
const path = require('path')
const fs = require('fs')
const jsonfile = require('jsonfile')
const prettier = require('prettier')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

async function updateReadme() {
  const hooks = await globby('./packages/*/package.json')
  console.log('Add Hooks to Readme:')
  const packages = hooks
    .map(file => {
      const pck = jsonfile.readFileSync(file)
      if (pck.private) return null
      console.log('- ' + pck.name)
      return {
        name: path.basename(path.dirname(file)),
        packageName: pck.name,
        description: pck.description,
      }
    })
    .filter(Boolean)

  let output = packages
    .map(item => {
      return `- **[${item.name}](https://www.npmjs.com/package/${
        item.packageName
      })** - ${item.description}`
    })
    .join('\n')

  const readme = await readFileAsync('README.md', 'utf-8')
  const newReadme = prettier.format(
    readme.replace(
      /<!-- HOOKS_START -->([\w\W]+?)<!-- HOOKS_END -->/,
      `<!-- HOOKS_START -->\n${output}\n\n<!-- HOOKS_END -->`,
    ),
    { parser: 'markdown' },
  )

  if (readme !== newReadme) {
    await writeFileAsync('README.md', newReadme, 'utf-8')
  }
}

updateReadme()
