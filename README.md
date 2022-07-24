# Nest + Vue + Vite

![Nest Vue Vite](readme-img/nest-vue-vite.png)

Combine [Nestjs](https://nestjs.com/) and [Vue 3](https://vuejs.org/) as static frontend.

## Run

First clone di repository, and Run

### Install node package

```bash
yarn install 
or
npm install
```

### Run development

This command will run Nestjs server and serve client frontend using vite-server

```
yarn server:dev
```

If you want to run client with different instance node

```
yarn client:dev
```

### Build

Build server
```
yarn server:build
```

Build client
```
yarn client:build
```

**Build all (server and client)**
```
yarn all:build
```

### Production

Setup your .env

```
NODE_ENV=production
```

Build all

```
yarn all:build
```

Run server

```
yarn server:start
```

## Config

Server config saved at `src/config/app.ts`

#### clientDir

Client dir is vue directory

#### prefixApi

All API Server must using this prefix to prevent collision url path

#### serveStaticClient

if `true`, it will serve client frontend. In case you want to serve in other server, set it `false`