# Charlie Tango Hooks

[![Version Badge][npm-version-svg]][package-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![styled with prettier][prettier-svg]][prettier-url]

Collection of React Hooks used by Charlie Tango.

**Storybook Demo:** https://ct-hooks.now.sh

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

- **[@charlietango/use-client-hydrated](https://www.npmjs.com/package/@charlietango/use-client-hydrated)** _([useClientHydrated](packages/useClientHydrated/src))_ - Check if the client has been hydrated
- **[@charlietango/use-element-size](https://www.npmjs.com/package/@charlietango/use-element-size)** _([useElementSize](packages/useElementSize/src))_ - Measure the size of a DOM element using ResizeObserver
- **[@charlietango/use-focus-trap](https://www.npmjs.com/package/@charlietango/use-focus-trap)** _([useFocusTrap](packages/useFocusTrap/src))_ - Trap keyboard focus inside a DOM element, to prevent the user navigating outside a modal
- **[@charlietango/use-id](https://www.npmjs.com/package/@charlietango/use-id)** _([useId](packages/useId/src))_ - Generate a deterministic id using a Context Provider
- **[@charlietango/use-interaction](https://www.npmjs.com/package/@charlietango/use-interaction)** _([useInteraction](packages/useInteraction/src))_ - Monitor the user interactions on an element
- **[@charlietango/use-media](https://www.npmjs.com/package/@charlietango/use-media)** _([useMedia](packages/useMedia/src))_ - Detect if the browser matches a media query
- **[@charlietango/use-native-lazy-loading](https://www.npmjs.com/package/@charlietango/use-native-lazy-loading)** _([useNativeLazyLoading](packages/useNativeLazyLoading/src))_ - Detect if the browser supports the new 'loading' attribute on Image elements.
- **[@charlietango/use-script](https://www.npmjs.com/package/@charlietango/use-script)** _([useScript](packages/useScript/src))_ - Load an external third party script
- **[@charlietango/use-toggle](https://www.npmjs.com/package/@charlietango/use-toggle)** _([useToggle](packages/useToggle/src))_ - Simple boolean state toggler
- **[@charlietango/use-window-size](https://www.npmjs.com/package/@charlietango/use-window-size)** _([useWindowSize](packages/useWindowSize/src))_ - Get the width and height of the viewport

<!-- HOOKS_END -->

To use the Hook, import it from the package you installed, like:

```js
import useMedia from "@charlietango/use-media";
```

### `@charlietango/hooks`

The [@charlietango/hooks](https://www.npmjs.com/package/@charlietango/hooks)
module collects all of the individual modules into a single dependency. The module
is optimized for tree shaking, so you application should only include the dependencies
you actually use.

```js
import { useMedia } from "@charlietango/hooks";
```

## Contributing

This hooks library is built at as a monorepo using Lerna and Yarn Workspaces.

To start working on a new hook, you should run the `new-hook` script to generate the new package.

```
yarn new-hook
```

[package-url]: https://npmjs.org/package/@charlietango/hooks
[npm-version-svg]: https://img.shields.io/npm/v/@charlietango/hooks.svg
[deps-svg]: https://david-dm.org/charlie-tango/hooks.svg
[deps-url]: https://david-dm.org/charlie-tango/hooks
[dev-deps-svg]: https://david-dm.org/charlie-tango/hooks/dev-status.svg
[dev-deps-url]: https://david-dm.org/charlie-tango/hooks#info=devDependencies
[license-image]: http://img.shields.io/npm/l/@charlietango/hooks.svg
[license-url]: LICENSE
[prettier-svg]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
