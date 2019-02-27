const globby = require('globby')
const path = require('path')
const fs = require('fs')
const jsonfile = require('jsonfile')
const prettier = require('prettier')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

function sortByName(a, b) {
  const nameA = a.name.toUpperCase() // ignore upper and lowercase
  const nameB = b.name.toUpperCase() // ignore upper and lowercase
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
}

async function updateReadme() {
  const hooks = await globby('./packages/use*/package.json')
  const packages = hooks
    .map(file => {
      const pck = jsonfile.readFileSync(file)
      if (pck.private) return null

      return {
        name: path.basename(path.dirname(file)),
        packageName: pck.name,
        description: pck.description,
        src: path.join(path.dirname(file), 'src'),
      }
    })
    .filter(Boolean)
    .sort(sortByName)

  console.log('Add Hooks to Readme:')
  let output = packages
    .map(item => {
      console.log('- ' + item.name)
      return `- **[${item.packageName}](https://www.npmjs.com/package/${
        item.packageName
      })** _([${item.name}](${item.src}))_ - ${item.description}`
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
