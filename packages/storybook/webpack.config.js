// webpack.config.js
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const path = require('path')
const globby = require('globby')
/**
 * See: https://www.gatsbyjs.org/docs/visual-testing-with-storybook/
 * */
module.exports = (baseConfig, env, defaultConfig) => {
  // defaultConfig.entry = defaultConfig.entry.map(path => {
  //   if (path.includes('webpack-hot-middleware')) {
  //     return path + '&overlay=false'
  //   }
  //   return path
  // })
  defaultConfig.resolve.extensions.push('.ts', '.tsx')

  const sourceRoots = globby
    .sync(['../use*/src'], { onlyDirectories: true, onlyFiles: false })
    .map(file => path.resolve(file))

  defaultConfig.module.rules[0].test = /\.(mjs|[tj]sx?)$/
  defaultConfig.module.rules[0].include = [...sourceRoots, path.resolve('./')]

  defaultConfig.module.rules[0].exclude = [
    path.resolve('../../node_modules'),
    path.resolve('node_modules'),
  ]

  // use @babel/preset-react for JSX and env (instead of staged presets)
  defaultConfig.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
  ]

  return defaultConfig
}
