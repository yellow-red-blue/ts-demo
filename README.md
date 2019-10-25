# ts-axios-demo
## ts intro
###1. 基础类型
```
let isDone: boolean = true
isDone = 'string' // errors

let index: number = 12

let str: string = 'string'

let arr: Array<number> = [2, 4]

let arr1: number[] = [1, 3]

元组
let x: [string, number]
x = ['str', 8]
x = [8, 'str'] // Error

枚举
enum Color {Red, Blue, Green}
let c: Color = Color.Red // 0
let b = Color[1] // 'Blue'

// 指定位置
enum Color {Red, Blue=3, Green}
<!-- 默认从0开始 -->
console.log(Color.Red) // 0
console.log(Color.Blue) // 3

<!-- any类型 -->
let a: any  = 'str'
a = 10
a = true
```
有兴趣的可以去[ts练习](https://www.tslang.cn/play/index.html)

### 变量声明
变量声明和 es6基本一样，这里只简单的讲一下

```
//javascript
var a = 10 
//其实可以分为两步
var a
a = 10
//在js中 var声明的变量会进行变量提升。

es6中使用 let const来声明变量
// let  const 和var的区别主要在于 let和const 创造了块级作用域，且不会进行变量提升，所以在使用之前一定要先
// 创建变量。  let和const的区别在于，let定义的变量可以修改。const定义的变量不可修改(指的是变量本身的地址 // 不可修改)
// 例如
const myConst = 'myconst'
myConst = 'youconst' // error

const myCon = [8,9]
myCon.push(0) // right
```

### 接口
**TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约**
```
interface requestConfig {
  url: string
  method: string,
}

function processConfig(config: requestConfig): void {
  console.log(config.data) // Property 'data' does not exist on type 'requestConfig'.
}
```
类型检查器会对 config进行检查，上面我们看到 config接口定义并没有is这个属性，所以在编译阶段ts就会报错

可选属性
```
interface requestConfig {
  url: string
  method: string
  data?: string
  params?: any
  header?: any
}

function processConfig(config: requestConfig): void {
  console.log(config.data)
  console.log(config.datay) 
  // Property 'datay' does not exist on type 'requestConfig'. Did you mean 'data'?
}
```
可选属性的好处是对可能存在的属性进行预定义，
好处之二就是可以捕获不存在的属性时的错误。上面写错了 datay  报错如上。

只读属性
```
interface requestConfig {
  readonly url: string
  method: string
  data?: string
  params?: any
  header?: any
}

function processConfig(config: requestConfig): void {
  config.url = 'http://www.baidu.com'
  // Cannot assign to 'url' because it is a constant or a read-only property.
  config.method = 'get'
}


```
上面我们对只读属性url进行赋值时，会报错
readonly vs const
最简单的判断该用 readonly还是 const的方法就是看要把它当成变量合适属性使用，变量就用const 属性用readonly

额外的属性检查
```
interface requestConfig {
  url: string
  method: string
  data?: string
  params?: any
  header?: any
  [propName: string]: any
}

function processConfig(config: requestConfig): void {
  config.url = 'http://www.baidu.com'
  config.method = 'get'
  config.urls =
}
```
对象字面量会被特殊对待并且会经过额外的属性检查，


## 类
类的写法。es6上类的写法和ts类似，但多了一些功能
先看一个最简单的class写法
```
class Axios {
  url: string
  constructor(msg: string) {
  this.url = msg
    console.log(msg)
  }
  get() {
    return this.url
  }
}
let axios = new Axios('www.baidu.com')
```
继承  extends


[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/alexjoverm/typescript-library-starter.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/alexjoverm/typescript-library-starter.svg)](https://travis-ci.org/alexjoverm/typescript-library-starter)
[![Coveralls](https://img.shields.io/coveralls/alexjoverm/typescript-library-starter.svg)](https://coveralls.io/github/alexjoverm/typescript-library-starter)
[![Dev Dependencies](https://david-dm.org/alexjoverm/typescript-library-starter/dev-status.svg)](https://david-dm.org/alexjoverm/typescript-library-starter?type=dev)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/AJoverMorales)

A starter project that makes  a TypeScript creatinglibrary extremely easy.

![](https://i.imgur.com/opUmHp0.png)

### Usage

```bash
git clone https://github.com/alexjoverm/typescript-library-starter.git YOURFOLDERNAME
cd YOURFOLDERNAME

# Run npm install and write your library name when asked. That's all!
npm install
```

**Start coding!** `package.json` and entry files are already set up for you, so don't worry about linking to your main file, typings, etc. Just keep those files with the same name.

### Features

 - Zero-setup. After running `npm install` things will setup for you :wink:
 - **[RollupJS](https://rollupjs.org/)** for multiple optimized bundles following the [standard convention](http://2ality.com/2017/04/setting-up-multi-platform-packages.html) and [Tree-shaking](https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/)
 - Tests, coverage and interactive watch mode using **[Jest](http://facebook.github.io/jest/)**
 - **[Prettier](https://github.com/prettier/prettier)** and **[TSLint](https://palantir.github.io/tslint/)** for code formatting and consistency
 - **Docs automatic generation and deployment** to `gh-pages`, using **[TypeDoc](http://typedoc.org/)**
 - Automatic types `(*.d.ts)` file generation
 - **[Travis](https://travis-ci.org)** integration and **[Coveralls](https://coveralls.io/)** report
 - (Optional) **Automatic releases and changelog**, using [Semantic release](https://github.com/semantic-release/semantic-release), [Commitizen](https://github.com/commitizen/cz-cli), [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog) and [Husky](https://github.com/typicode/husky) (for the git hooks)

### Importing library

You can import the generated bundle to use the whole library generated by this starter:

```javascript
import myLib from 'mylib'
```

Additionally, you can import the transpiled modules from `dist/lib` in case you have a modular library:

```javascript
import something from 'mylib/dist/lib/something'
```

### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

### Excluding peerDependencies

On library development, one might want to set some peer dependencies, and thus remove those from the final bundle. You can see in [Rollup docs](https://rollupjs.org/#peer-dependencies) how to do that.

Good news: the setup is here for you, you must only include the dependency name in `external` property within `rollup.config.js`. For example, if you want to exclude `lodash`, just write there `external: ['lodash']`.

### Automatic releases

_**Prerequisites**: you need to create/login accounts and add your project to:_
 - [npm](https://www.npmjs.com/)
 - [Travis CI](https://travis-ci.org)
 - [Coveralls](https://coveralls.io)

_**Prerequisite for Windows**: Semantic-release uses
**[node-gyp](https://github.com/nodejs/node-gyp)** so you will need to
install
[Microsoft's windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)
using this command:_

```bash
npm install --global --production windows-build-tools
```

#### Setup steps

Follow the console instructions to install semantic release and run it (answer NO to "Do you want a `.travis.yml` file with semantic-release setup?").

_Note: make sure you've setup `repository.url` in your `package.json` file_

```bash
npm install -g semantic-release-cli
semantic-release-cli setup
# IMPORTANT!! Answer NO to "Do you want a `.travis.yml` file with semantic-release setup?" question. It is already prepared for you :P
```

From now on, you'll need to use `npm run commit`, which is a convenient way to create conventional commits.

Automatic releases are possible thanks to [semantic release](https://github.com/semantic-release/semantic-release), which publishes your code automatically on [github](https://github.com/) and [npm](https://www.npmjs.com/), plus generates automatically a changelog. This setup is highly influenced by [Kent C. Dodds course on egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)

### Git Hooks

There is already set a `precommit` hook for formatting your code with Prettier :nail_care:

By default, there are two disabled git hooks. They're set up when you run the `npm run semantic-release-prepare` script. They make sure:
 - You follow a [conventional commit message](https://github.com/conventional-changelog/conventional-changelog)
 - Your build is not going to fail in [Travis](https://travis-ci.org) (or your CI server), since it's runned locally before `git push`

This makes more sense in combination with [automatic releases](#automatic-releases)

### FAQ

#### `Array.prototype.from`, `Promise`, `Map`... is undefined?

TypeScript or Babel only provides down-emits on syntactical features (`class`, `let`, `async/await`...), but not on functional features (`Array.prototype.find`, `Set`, `Promise`...), . For that, you need Polyfills, such as [`core-js`](https://github.com/zloirock/core-js) or [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) (which extends `core-js`).

For a library, `core-js` plays very nicely, since you can import just the polyfills you need:

```javascript
import "core-js/fn/array/find"
import "core-js/fn/string/includes"
import "core-js/fn/promise"
...
```

#### What is `npm install` doing on first run?

It runs the script `tools/init` which sets up everything for you. In short, it:
 - Configures RollupJS for the build, which creates the bundles
 - Configures `package.json` (typings file, main file, etc)
 - Renames main src and test files

#### What if I don't want git-hooks, automatic releases or semantic-release?

Then you may want to:
 - Remove `commitmsg`, `postinstall` scripts from `package.json`. That will not use those git hooks to make sure you make a conventional commit
 - Remove `npm run semantic-release` from `.travis.yml`

#### What if I don't want to use coveralls or report my coverage?

Remove `npm run report-coverage` from `.travis.yml`

## Resources

- [Write a library using TypeScript library starter](https://dev.to/alexjoverm/write-a-library-using-typescript-library-starter) by [@alexjoverm](https://github.com/alexjoverm/)
- [📺 Create a TypeScript Library using typescript-library-starter](https://egghead.io/lessons/typescript-create-a-typescript-library-using-typescript-library-starter) by [@alexjoverm](https://github.com/alexjoverm/)
- [Introducing TypeScript Library Starter Lite](https://blog.tonysneed.com/2017/09/15/introducing-typescript-library-starter-lite/) by [@tonysneed](https://github.com/tonysneed)

## Projects using `typescript-library-starter`

Here are some projects that use `typescript-library-starter`:

- [NOEL - A universal, human-centric, replayable event emitter](https://github.com/lifenautjoe/noel)
- [droppable - A library to give file dropping super-powers to any HTML element.](https://github.com/lifenautjoe/droppable)
- [redis-messaging-manager - Pubsub messaging library, using redis and rxjs](https://github.com/tomyitav/redis-messaging-manager)

## Credits

Made with :heart: by [@alexjoverm](https://twitter.com/alexjoverm) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->

# ts-demo
