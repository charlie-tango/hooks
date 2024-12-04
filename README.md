# Charlie Tango Hooks

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

Collection of React Hooks used by [Charlie Tango](https://www.charlietango.dk/).

- Written in TypeScript, with full types support.
- Small and focused, each hook does one thing well.
- No barrel file, only import the hooks you need.
- Exported as ESM.
- Optimized for modern React, uses newer APIs like `useSyncExternalStore`.
- All hooks work in a server-side rendering environment.
- All hooks are tested with [Vitest](https://vitest.dev/) in a real browser environment.

## Installation

Install using npm:

```sh
npm install @charlietango/hooks --save
```

## The Hooks

All the hooks are exported on their own, so we don't have a barrel file with all the hooks.
This guarantees that you only import the hooks you need, and don't bloat your bundle with unused code.

### `useCookie`

A hook to interact with the `document.cookie`. It works just like the `useState` hook, but it will persist the value in the cookie.
The hook only sets and gets the `string` value - If you need to store an object, you need to serialize it yourself.

```ts
import { useCookie } from "@charlietango/hooks/use-cookie";

const [value, setValue] = useCookie("mode");
```

If the cookies is changed outside the `useCookie` hook, you can call the `revalidateCookies`, to get React to reevaluate the cookie values.

```ts
import { revalidateCookies } from "@charlietango/hooks/use-cookie";

revalidateCookies();
```

### `useDebouncedValue`

Debounce a value. The value will only be updated after the delay has passed without the value changing.

```ts
import { useDebouncedValue } from "@charlietango/hooks/use-debounced-value";

const [debouncedValue, setDebouncedValue] = useDebouncedValue(
  initialValue,
  500,
);

setDebouncedValue("Hello");
setDebouncedValue("World");
console.log(debouncedValue); // Will log "Hello" until 500ms has passed
```

The `setDebouncedValue` also contains a few control methods, that can be useful:

- `flush`: Call the callback immediately, and cancel debouncing.
- `cancel`: Cancel debouncing, and the callback will never be called.
- `isPending`: Check if the callback is waiting to be called.
  You can use them like this:

```tsx
const [debouncedValue, setDebouncedValue] = useDebouncedValue(
  initialValue,
  500,
);

setDebouncedValue("Hello");
setDebouncedValue.isPending(); // true
setDebouncedValue.flush(); // Logs "Hello"
setDebouncedValue("world");
setDebouncedValue.cancel(); // Will never log "world"
```

### `useDebouncedCallback`

Debounce a callback function. The callback will only be called after the delay has passed without the function being called again.

```ts
import { useDebouncedCallback } from "@charlietango/hooks/use-debounced-callback";

const debouncedCallback = useDebouncedCallback((value: string) => {
  console.log(value);
}, 500);

debouncedCallback("Hello");
debouncedCallback("World"); // Will only log "World" after 500ms
```

The `debouncedCallback` also contains a few control methods, that can be useful:

- `flush`: Call the callback immediately, and cancel debouncing.
- `cancel`: Cancel debouncing, and the callback will never be called.
- `isPending`: Check if the callback is waiting to be called.

You can use them like this:

```tsx
const debouncedCallback = useDebouncedCallback((value: string) => {
  console.log(value);
}, 500);

debouncedCallback("Hello");
debouncedCallback.isPending(); // true
debouncedCallback.flush(); // Logs "Hello"
debouncedCallback("world");
debouncedCallback.cancel(); // Will never log "world"
```

### `useElementSize`

Monitor the size of an element, and return the size object.
Uses the ResizeObserver API, so it will keep track of the size changes.

```ts
import { useElementSize } from "@charlietango/hooks/use-element-size";

const { ref, size } = useElementSize(options);
```

### `useMedia`

Monitor a media query, and return a boolean indicating if the media query matches. Until the media query is matched, the hook will return `undefined`.

```ts
import { useMedia } from "@charlietango/hooks/use-media";

const isDesktop = useMedia({ minWidth: 1024 });
const prefersReducedMotion = useMedia(
  "(prefers-reduced-motion: no-preference)",
);
```

### `usePrevious`

Keep track of the previous value of a variable.

```ts
import { usePrevious } from "@charlietango/hooks/use-previous";

const prevValue = usePrevious(value);
```

### `useScript`

When loading external scripts, you might want to know when the script has loaded, and if there was an error.
Because it's external, it won't be able to trigger a callback when it's done - Therefor you need to monitor the `<script>` tag itself.
The `useScript` hook will handle this for you.

You can load the same script multiple times, and the hook will share the script and status between all instances.

```ts
import { useScript } from "@charlietango/hooks/use-script";

const status = useScript("https://example.com/script.js"); // "idle" | "loading" | "ready" | "error"
if (status === "ready") {
  // Script is loaded
}
```

### `useStorage`

A hook to interact with the `localStorage` or `sessionStorage`. It works just like the `useState` hook, but it will persist the value in the storage.
The hook only sets and gets the `string` value - If you need to store an object, you need to serialize it yourself.

```ts
import { useStorage } from "@charlietango/hooks/use-storage";

const [value, setValue] = useStorage("mode", { mode: "local" });
setValue("dark");
```

### `useWindowSize`

Get the current window size. If the window resizes, the hook will update the size.

```ts
import { useWindowSize } from "@charlietango/hooks/use-window-size";

const { width, height } = useWindowSize();
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@charlietango/hooks?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@charlietango/hooks
[license-src]: https://img.shields.io/github/license/charlie-tango/hooks.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/charlie-tango/hooks/blob/main/LICENSE
