# Es6-Webpack2-Boilerplate [![npm version](https://badge.fury.io/js/es6-webpack2-boilerplate.svg)](https://badge.fury.io/js/es6-webpack2-boilerplate) [![Build Status](https://travis-ci.org/maiwenan/es6-webpack2-boilerplate.svg?branch=master)](https://travis-ci.org/maiwenan/es6-webpack2-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/maiwenan/es6-webpack2-boilerplate/badge.svg)](https://coveralls.io/github/maiwenan/es6-webpack2-boilerplate)

基于 `babel6` 和 `webpack2` 构建的前端开发工作流

## 项目规范

该模板是遵循下面的目录规范进行构建的，如果要使用不同的目录结构，需要修改对应的配置文件（主要是入口文件和静态页面文件）

* 所有页面放置在 `views` 文件夹下，并且不能有嵌套目录结构，否则会被忽略
* 每个页面对应的入口文件(入口文件一定要命名为 `index.js` )都需要放在 `src/views/[name]` 文件夹下，其中 `[name]` 为页面的文件名
* 构建时，提取前端资源遵循以下方法:

  * 项目依赖的第三方模块(通过 `npm` 管理的)以及 `src/vendor` 目录下面的模块一起打包成一个文件，即 `vendor.js`
  * `src/vendor` 目录下面应该放置一些不经常更新的模块，这样做主要是为了更好使用缓存
  * 每个模块如果被 2 个及以上的页面所共用，则会提取出来放到 `common.js` 文件中

## 下载

```
$ git clone https://github.com/maiwenan/es6-webpack2-boilerplate my-app
$ cd my-app
$ npm install
```

**注意 :** 修改 `package.json` 文件相关的内容，如 : `name`, `description`, `author`, `repository` 等

## 使用

* 开发阶段可以运行下面的命令启动项目，启动后可以访问 `http://localhost:3000/home.html`

```
npm start
```

* 发布阶段运行下面的命令对前端资源进行构建

```
npm run build
```

## License

[MIT License](https://github.com/maiwenan/es6-webpack2-boilerplate/blob/master/LICENSE)
