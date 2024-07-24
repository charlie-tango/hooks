# Charlie Tango Hooks

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

Collection of React Hooks used by [Charlie Tango](https://www.charlietango.dk/).

- Written in TypeScript, with full types support.
- Small and focused, each hook does one thing well.
- Optimized for modern React, uses newer APIs like `useSyncExternalStore`.
- All hooks work in a server-side rendering environment.
- All hooks are tested with [Vitest](https://vitest.dev/) in a real browser environment.

## Installation

Install using npm:

```sh
npm install @charlietango/hooks --save
```

## The Hooks

### `useElementSize`

Monitor the size of an element, and return the size object.
Uses the ResizeObserver API, so it will keep track of the size changes.

```ts
const { ref, size } = useInView(options);
```

### `useMedia`

Monitor a media query, and return a boolean indicating if the media query matches. Until the media query is matched, the hook will return `undefined`.

```ts
const isDesktop = useMedia({ minWidth: 1024 });
const prefersReducedMotion = useMedia(
  "(prefers-reduced-motion: no-preference)",
);
```

### `usePrevious`

Keep track of the previous value of a variable.

```ts
const prevValue = usePrevious(value);
```

### `useWindowSize`

Get the current window size. If the window resizes, the hook will update the size.

```tsx
const { width, height } = useWindowSize();
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@charlietango/hooks?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@charlietango/hooks
[license-src]: https://img.shields.io/github/license/charlie-tango/hooks.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/charlie-tango/hooks/blob/main/LICENSE
