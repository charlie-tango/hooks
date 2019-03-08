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
  const packageName = kebabCase(name)
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
        .replace(/%packageName%/g, packageName)
        .replace(/%description%/g, description)
        .replace(/%version%/g, hooksPck.version)

      await mkdirp(path.dirname(outputName))
      await writeFileAsync(outputName, replacedSrc, 'utf-8')
      console.log(ansi.cyan(`> ${path.relative(process.cwd(), outputName)}`))
    }),
  )

  await installPackages(dirName)
}

async function installPackages(dirName) {
  process.chdir(dirName)
  const spinner = ora('Installing packages').start()
  try {
    await execa.shell('yarn')
    spinner.succeed('Installation successful')
  } catch (err) {
    spinner.fail(err.message)
  }
}

startCreation()
