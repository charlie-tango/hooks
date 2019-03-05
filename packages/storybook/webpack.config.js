// webpack.config.js
const path = require('path')
const globby = require('globby')
/**
 * See: https://www.gatsbyjs.org/docs/visual-testing-with-storybook/
 * */
module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx')

  const sourceRoots = globby
    .sync(['../use*/src'], { onlyDirectories: true, onlyFiles: false })
    .map(file => path.resolve(file))

  config.module.rules[0].test = /\.(mjs|[tj]sx?)$/
  config.module.rules[0].include = [...sourceRoots, path.resolve('./')]

  config.module.rules[0].exclude = [
    path.resolve('../../node_modules'),
    path.resolve('node_modules'),
  ]

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
  ]

  return config
}
