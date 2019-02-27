# Charlie Tango Hooks

[![Version Badge][npm-version-svg]][package-url]
[![GZipped size][npm-minzip-svg]][bundlephobia-url]
[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]

Collection of React Hooks used by Charlie Tango.

**Storybook Demo:** https://ct-hooks.netlify.com

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add @charlietango/hooks
```

or NPM:

```sh
npm install @charlietango/hooks --save
```

## The Hooks

### Individual hooks

All of our Hooks are published into their own NPM module, so you can pick and choose exactly the ones you need.

<!-- HOOKS_START -->

- **[@charlietango/use-element-size](https://www.npmjs.com/package/@charlietango/use-element-size)** _([useElementSize](packages/useElementSize/src))_ - Measure the size of a DOM element using ResizeObserver
- **[@charlietango/use-media](https://www.npmjs.com/package/@charlietango/use-media)** _([useMedia](packages/useMedia/src))_ - Detect if the browser matches a media query
- **[@charlietango/use-script](https://www.npmjs.com/package/@charlietango/use-script)** _([useScript](packages/useScript/src))_ - Load an external third party script

<!-- HOOKS_END -->

```js
import useMedia from "@charlietango/use-media";
```

### @charlietango/hooks`

The [@charlietango/hooks](https://www.npmjs.com/package/@charlietango/hooks)
module collects all of the individual modules into a single dependency. The module
is optimized for tree shaking, so you application should only include the dependencies
you actually use.

```js
import { useMedia } from "@charlietango/hooks";
```

### Third Party Hooks

The [@charlietango/hooks](https://www.npmjs.com/package/@charlietango/hooks) collection also includes:

- **[react-intersection-observer](https://github.com/charlie-tango/hooks/)**
  _([useInView](https://github.com/charlie-tango/hooks/))_ -
  Monitor when an element enters or leaves the viewport.

## Contributing

To keep the quality of this collection high, all the Hooks should be documented
and well tested.

Tests should be written using
[react-hooks-testing-library](https://www.npmjs.com/package/react-hooks-testing-library).

### Creating a new Hook

Run `yarn new-hook` to create and configure a new Hook.

This will prompt you to enter the `name` and `description` for your Hook, before
adding it to the `./packages` dir. This will create a new NPM package called
`@charlietango/{{HookName}}`.

### Publishing

Currently publishing a new release is a manually `lerna publish` task. Make sure
you have access rights to publish to our NPM before creating a new release.

```
yarn release
```

**Lerna** should bump the version automatically based on the conventional commit
history.

[package-url]: https://npmjs.org/package/@charlietango/hooks
[npm-version-svg]: https://img.shields.io/npm/v/@charlietango/hooks.svg
[npm-minzip-svg]: https://img.shields.io/bundlephobia/minzip/react.svg
[bundlephobia-url]: https://bundlephobia.com/result?p=@charlietango/hooks
[travis-svg]: https://travis-ci.org/charlie-tango/hooks.svg
[travis-url]: https://travis-ci.org/charlie-tango/hooks
[deps-svg]: https://david-dm.org/charlie-tango/hooks.svg
[deps-url]: https://david-dm.org/charlie-tango/hooks
[dev-deps-svg]: https://david-dm.org/charlie-tango/hooks/dev-status.svg
[dev-deps-url]: https://david-dm.org/charlie-tango/hooks#info=devDependencies
[license-image]: http://img.shields.io/npm/l/@charlietango/hooks.svg
[license-url]: LICENSE
[greenkeeper-svg]: https://badges.greenkeeper.io/charlie-tango/hooks.svg
[greenkeeper-url]: https://greenkeeper.io/
