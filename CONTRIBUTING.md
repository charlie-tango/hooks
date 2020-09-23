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

The project uses [semantic release](https://semantic-release.gitbook.io/) to publish packages when they are merged into `master`.
