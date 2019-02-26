# Charlie Tango Hooks

[![Greenkeeper badge](https://badges.greenkeeper.io/charlie-tango/hooks.svg)](https://greenkeeper.io/)

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

## Hooks

<!-- HOOKS_START -->
<!-- HOOKS_END -->

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
