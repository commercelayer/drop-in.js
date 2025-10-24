# Contributing

Fork, then clone the repo.

Set up the project with [Node.js](https://nodejs.org/en) and [pnpm](https://pnpm.io/), then run:

```sh
pnpm i
```

Make sure the tests pass:

```sh
pnpm test
```

If you get the error "_Browser was not found at the configured executablePath_", run the following:

```sh
node packages/drop-in/node_modules/puppeteer/install.mjs

# or

node node_modules/puppeteer/install.mjs
```

Make your change. Add tests for your change. Make the tests pass.

Push to your fork and [submit a pull request](https://github.com/commercelayer/drop-in.js/compare/).
