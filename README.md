# Node CLI Admin Boilerplate

A minimalistic yet Node boilerplate for making administration utility

---

## Install

Clone the repo via git:

```bash
git clone https://github.com/nimo1491/node-cli-admin-boilerplate.git your-project-name
```

And then install dependencies. Suggest using [yarn](https://github.com/yarnpkg/yarn) for faster and safer installation:

```bash
cd your-project-name && yarn install
```

## Build

Transpiler source code:

```bash
yarn run build
```

The application will be put into the *built* folder.

## Generate document

Use [typedoc](https://github.com/TypeStrong/typedoc) to generate API document:

```bash
yarn run doc
```

The document will be put into the *docs* folder.

## Package

Use [pkg](https://github.com/zeit/pkg) to package the application into an executable:

```
yarn run package
```

The executable will be put into the *dist* folder.

## License

MIT
