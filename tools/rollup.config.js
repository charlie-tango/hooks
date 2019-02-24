import path from 'path'
import globby from 'globby'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import capitalize from 'lodash/fp/capitalize'

const pkg = require(path.resolve('./package.json'))

// Generate the hook name from the pkg.name
const hookName = `use${pkg.name
  .split('-')
  .slice(1)
  .map(capitalize)
  .join('')}`

const root = process.platform === 'win32' ? path.resolve('/') : '/'
const external = id => !id.startsWith('.') && !id.startsWith(root)
const extensions = ['.js', '.jsx', '.ts', '.tsx']
const sourceFiles = globby.sync(`src/{${hookName},index}.{ts,tsx,js}`)
console.log(hookName, sourceFiles)
if (!sourceFiles.length) {
  throw new Error('Failed to find a valid source input file for ' + pkg.name)
}

const entries = [
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'esm',
  },
]

const output = entries.map(({ file, format }) => ({
  input: sourceFiles[0],
  output: { file, format, exports: 'named' },
  external,
  plugins: [
    resolve({ extensions }),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
      extensions,
      include: ['src/**/*'],
      plugins: [
        [
          '@babel/transform-runtime',
          { regenerator: false, useESModules: format === 'esm' },
        ],
      ],
    }),
  ],
}))

export default output
