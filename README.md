# Node CLI Admin Boilerplate

A minimalistic yet Node boilerplate for making administration utility

---

> You can see dashboard information of a node.

![Dashboard Command](https://user-images.githubusercontent.com/738544/27579345-c81c5f5a-5b59-11e7-97e2-01ded749926d.gif)

> Or easily manage multiple nodes.

![Manage Command](https://user-images.githubusercontent.com/738544/27579430-0e186bac-5b5a-11e7-8a7e-9f3f76ec32d5.gif)

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

## Development server

```bash
yarn run server
```

This will start a server, listening on connection from `localhost` on port `8080`. 

When you change your source code, it should live-reload the changes.

## Generate document

Use [typedoc](https://github.com/TypeStrong/typedoc) to generate API document:

```bash
yarn run doc
```

The document will be put into the *docs* folder.

## Package

Use [pkg](https://github.com/zeit/pkg) to package the application into an executable:

```bash
yarn run package
```

The executable will be put into the *dist* folder.

## Docker Support

Use docker to launch multiple development servers to simulate the Data Center environment.

### Build your docker

```bash
docker build -t name/emulator .
```

### Launch 10 development servers

```bash
docker-compose scale web=10
```

**Note:** replace `image: nimo1491/emulator` in `docker-compose.yml` by your docker image name.

## License

MIT
