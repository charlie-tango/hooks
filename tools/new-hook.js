const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const execa = require('execa')
const ansi = require('ansi-colors')
const globby = require('globby')
const { promisify } = require('util')
const kebabCase = require('lodash/fp/kebabCase')
const hooksPck = require('../packages/hooks/package')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const mkdirp = promisify(require('mkdirp'))

async function startCreation() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Name of the new hook, starting with 'use'",
      validate: input => input.length > 3 && input.startsWith('use'),
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a short description of the hook.',
      default: '',
    },
  ])
  await execute(answers)
}

async function execute({ name, description }) {
  const files = await globby('./template/**/*.*', { dot: true })
  const packageName = `@charlietango/${kebabCase(name)}`
  const dirName = path.resolve('packages', name)

  await Promise.all(
    files.map(async file => {
      const src = await readFileAsync(file, 'utf-8')
      const outputName = path.resolve(
        dirName,
        file.replace(/[./]template/g, '').replace('name', name),
      )

      const replacedSrc = src
        .replace(/%name%/g, name)
        .replace(/%lowercaseName%/g, name.toLowerCase())
        .replace(/%packageName%/g, packageName)
        .replace(/%description%/g, description)
        .replace(/%version%/g, hooksPck.version)

      await mkdirp(path.dirname(outputName))
      await writeFileAsync(outputName, replacedSrc, 'utf-8')
      console.log(ansi.cyan(`> ${path.relative(process.cwd(), outputName)}`))
    }),
  )

  hooksPck.dependencies[packageName] = hooksPck.version

  await writeFileAsync(
    './packages/hooks/package.json',
    JSON.stringify(hooksPck, null, 2),
    'utf-8',
  )

  const hooksSrc = await readFileAsync('./packages/hooks/src/hooks.ts', 'utf-8')
  await writeFileAsync(
    './packages/hooks/src/hooks.ts',
    hooksSrc + `export { default as ${name} } from '${packageName}'\n`,
    'utf-8',
  )

  await installPackages()
}

async function installPackages() {
  const spinner = ora('Installing packages').start()
  try {
    await execa.shell('yarn')
    spinner.succeed('Installation successful')
  } catch (err) {
    spinner.fail(err.message)
  }
}

startCreation()
