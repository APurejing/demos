# Webpack5.x 初学者教程：一个循序渐进的指南（2022）

### 目录表：

    1. webpack 是什么？
    2. 安装 webpack
    3. 创建要打包的项目
    4. 安装打包用的脚本
    5. 创建一个包
    6. 配置 webpack 生成 HTML
    7. 在开发环境中使用 webpack
    8. 清理 dist 文件夹
    9. 用 npm 脚本命令运行 webpack
    10. 安装并运行一个热加载服务器
    11. 用 webpack 实现一个示例

#### 1. webpack 是什么？

$~~~~~~$简而言之，webpack 是一个开源的、用于现代 JavaScript 的静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为用于展示内容的静态资源。

$~~~~~~$这个 webpack 教程将主要关注最新的主要版本(5.x。在撰写本文时 X)。（通过 webpack 的更新日志可以了解更多 webpack 的历史。在此不做赘述。）

#### 2.安装 webpack

$~~~~~~$安装 webpack 5 需要将**Node 更新至 10.13.0 或更高版本**。
$~~~~~~$webpack 官方文档强烈建议在本地安装 webpack，而不是全局安装。本文示例使用本地安装（使用单独的本地安装，可以根据需要选择是否更新版本）。
$~~~~~~$首先，创建一个项目目录，我将示例项目的根文件夹命名为 webpack-example（可以按个人意愿命名）。创建后，运行如下两个命令：
（进入项目目录；使用 npm 的默认设置输出一个初始化 package.json 文件）

> cd webpack-example
> npm init -y

$~~~~~~$接下来，安装 webpack 和 webpack CLI（webpack 命令行接口）

> npm install webpack webpack-cli --save-dev

$~~~~~~$运行后，可以看到 package.json 文件显示如下：底部列出了两个依赖项："webpack","webpack-cli"，表示这个项目准备使用 webpack 作为打包工具。

> {
> "name": "webpack-example",
> "version": "1.0.0",
> "description": "",
> "main": "index.js",
> "scripts": {
> $~~~~$"test": "echo \"Error: no test specified\" && exit 1"
> $~~~~$},
> "keywords": [],
> "author": "",
> "license": "ISC",
> "devDependencies": {
> $~~~~$"webpack": "^5.69.1",
> $~~~~$"webpack-cli": "^4.9.2"
> $~~~~$}
> }

#### 3.创建要打包的项目

$~~~~$ 到目前为止，这个项目还没有任何东西需要被打包。所以我们向它添加一些内容来演示一个简单的 bundle 过程是如何发生的。
$~~~~$ 在 package.json 文件同级别创建一个 src 文件夹和一个 dist 文件夹，在 src 文件夹中创建 index.html 和 index.js（以上文件虽然不是 webpack 特有的，但却是通常打包和构建的过程）
$~~~~$ 首先，添加一些内容到 index.html 和 index.js。通常 src 目录会包含所有的网站内容，包括样式表、图片等，但为了演示 webpack 的特性，在此只写一个简单的例子。
$~~~~$ 按照传统，当你想要在一个项目中添加一个或多个库作为依赖项时，你可以使用单独的 \<script> 元素，一个接一个地将它们列在 index.html 页面的底部。webpack 的作用就在于，不仅可以避免手动在页面中添加脚本，还可以在打包的过程进行优化，有时甚至可以按需加载（例如引用的第三方库）。

$~~~~$ 理想情况下，每次我创建一个 bundle 时，我的 bundle 设置将清空 dist 文件夹。稍后我将详细介绍这一点，但现在我将把重点放在编辑 src 文件夹中的文件(编辑总是发生在这个文件夹中)。

#### 4.安装打包用的脚本

$~~~~$ 在此将使用 npm 安装示例使用的两个依赖：Flicking 和 Panzoom（实际项目中可能使用更多不同的库和工具，比如 React、Vue 或者 Babel.js 等），再用 webpack 打包。所以先来安装一下：

> npm install panzoom --save
> npm install @egjs/flicking --save

$~~~~$ 现在可以看到 package.json 文件中新增：

> "dependencies": {
> $~~~~$"@egjs/flicking": "^4.5.0",
> $~~~~$"panzoom": "^9.4.2"
> }

$~~~~$ 为了演示这些依赖打包成功，向 src 文件夹中的 index.js 文件添加以下内容：

> import panzoom from 'panzoom';
> import flicking from '@egjs/flicking';
> console.log(panzoom);
> console.log(flicking);

webpack 会在后台识别这两个 import，并在 node modules 文件夹中查找他们的依赖。console()只是为了证明 bundle 成功，且两个 import 都按预期运行。

#### 5. 创建一个包

NNwebpack 使用 package.json 作为入口文件，由入口文件告诉 webpack 使用哪个 module 构建项目的依赖图。依赖关系图本质上是应用程序需要的各 module 间的映射关系。
$~~~~$ 入口文件可以个性化指定，但我更喜欢配置越少越好，所以使用默认入口文件./src/index.js。现在开始用 webpack 打包，运行命令：

> npx webpack

$~~~~$ 这个命令告诉 webpack 使用默认入口文件打包我的 JavaScript 依赖,并在 dist 文件夹中输出结果，生成的 main.js 是 app 要使用的唯一文件。即使 src 文件夹中有 index.html，但 webpack 还没对它做任何处理，所以到目前为止 webpack 只生成了 main.js。此时打开 dist 文件夹中的 main.js，能看到项目中所有依赖的压缩打包结果。（如果 CLI 报关于没有设置 mode option 的警告，稍后将说明如何改正）。

$~~~~$ 到目前为止，index.html 还不会被打包到 dist 目录中。为此，安装一个插件，叫做 HtmlWebpackPlugin：

> npm install html-webpack-plugin --save-dev

NNpackage.json 的 devDependencies 发生如下变化：

> "devDependencies": {
> $~~~~$"html-webpack-plugin": "^5.5.0",
> $~~~~$"webpack": "^5.69.1",
> $~~~~$"webpack-cli": "^4.9.2"
> }

$~~~~$ 虽然 webpack 可以直接使用，但它额外添加一些手动配置会更方便使用。示例将在项目的根文件夹中创建一个 webpack.config.js 文件，写入手动配置内容：

> const HtmlWebpackPlugin = require('html-webpack-plugin');
> const path = require('path');
> module.exports = {
> $~~~~$plugins: [new HtmlWebpackPlugin()]
> };

$~~~~$ 现在再运行一下 webpack，HtmlWebpackPlugin 生成一个小的 html 文件，把打包的 JavaScript 通过\<script> 标签引入。但问题是，没有用到最开始在 src 文件夹中创建的 index.html。接下来，配置 HtmlWebpackPlugin 解决这个问题。
$~~~~$ 在 src/index.html 做一些改动，添加了变量占位，没有引用 JavaScript 文件：

> \<!DOCTYPE html>
> \<html lang="en">
> \<head>
> $~~~~$\<title><%= htmlWebpackPlugin.options.title %>\</title>
> $~~~~$\<meta charset="UTF-8" />
> $~~~~$\<meta name="viewport" content="width=device-width,initial-scale=1" />
> $~~~~$\<meta name="description" content="<%= htmlWebpackPlugin.options.metaDesc %>" />
> \</head>
> \<body>
> \<h1><%= htmlWebpackPlugin.options.header %>\</h1>
> \<div id="wrapper" style="height: 120px">
>
> $~~~~$\<div class="panel">\</div>
>
> $~~~~$\<div class="panel">\</div>
>
> $~~~~$\<div class="panel">\</div>
>
> \</div>
> \<div id="zoom-scene"></div> > \</body>
> \</html>

$~~~~$ 接下来向 webpack.config.js 中添加一些 HtmlWebpackPlugin 配置内容：

> plugins: [
>
> $~~~~$new HtmlWebpackPlugin({
> $~~~~~~$hash: true,
> $~~~~~~$title: 'Webpack Example App',
> $~~~~~~$header: 'Webpack Example Title',
> $~~~~~~$metaDesc: 'Webpack Example Description',
> $~~~~~~$template: './src/index.html',
> $~~~~~~$filename: 'index.html',
> $~~~~~~$inject: 'body'
> $~~~~$})
> ]

$~~~~$ 在上面的代码中设置了缓存清除，指定模版位置，并给出要在 dist 文件夹中输出的 HTML 文件的名称。另外需要注意的是，我已经指定了模板中三个占位的变量，在这里创建的属性不要与插件任何预定义选项冲突。最后将插入节点设置为\<body>，让 script 脚本插入到 body 节点的底部。（可以设置成 head 看到不同位置的效果）

#### 7. 在开发环境中使用 webpack

$~~~~$ 当 webpack 构建 dist 文件夹时，默认在生产环境中打包。为了在开发环境中使用，避免报出之前 cli 的警告，在 webpack.config.js 中添加一行配置，现在文件内容：

> const path = require('path');
> module.exports = {
> $~~~~$plugins: [
> $~~~~~~$new HtmlWebpackPlugin({
> $~~~~~~~~$hash: true,
> $~~~~~~~~$title: 'Webpack Example App',
> $~~~~~~~~$header: 'Webpack Example Title',
> $~~~~~~~~$metaDesc: 'Webpack Example Description',
> $~~~~~~~~$template: './src/index.html',
> $~~~~~~~~$filename: 'index.html',
> $~~~~~~~~$inject: 'body'
> $~~~~~~$})
>
> $~~~~$],
> $~~~~$mode: 'development'
> };

#### 8. 清理 dist 文件夹

$~~~~$ 每次运行 webpack 时，dist 文件夹保持不变，webpack 会创建一些文件并覆盖其他文件。但有时打包时可能会有新的目录、重命名文件等等，我们希望每次输出到 dist 文件夹中的都是当前所有文件打包后的结果（清空之前的打包文件）。所以在 webpack.config.js 中添加配置 output

> const path = require('path');
> module.exports = {
> $~~~~$plugins: [
> $~~~~~~$new HtmlWebpackPlugin({
> $~~~~~~~~$hash: true,
> $~~~~~~~~$title: 'Webpack Example App',
> $~~~~~~~~$header: 'Webpack Example Title',
> $~~~~~~~~$metaDesc: 'Webpack Example Description',
> $~~~~~~~~$template: './src/index.html',
> $~~~~~~~~$filename: 'index.html',
> $~~~~~~~~$inject: 'body'
> $~~~~~~$})
>
> $~~~~$],
> $~~~~$mode: 'development',
> $~~~~$output: {
> $~~~~~~$clean: true
> $~~~~$}
> };

#### 9. 用 npm 脚本命令运行 webpack

$~~~~$ 到目前为止，需要打包时都需要执行 npx webpack 命令，但使用 npm 命令会更高效便捷。在 package.json 中，有个"scripts"部分，在后面加上一行设置：

> ”build": "webpack"

$~~~~$ 现在可以用 npm run build 运行 webpack 了，效果与 npx webpack 一样。如果想要区分开发环境还是生产环境运行，可以配置如下：

> "scripts": {
> $~~~~$"test": "echo \"Error: no test specified\" && exit 1",
> $~~~~$"dev": "webpack --mode development",
> $~~~~$"build": "webpack --mode production"
> }

配置完成后即可以根据实际需要运行 npm run dev 或者 npm run build。

#### 10. 安装并运行一个热加载服务器

$~~~~$ 使用 webpack 这种工具时，最好在本地模拟真实的服务器环境。webpack 给了一个轻松安装实时加载 server 的选项。安装一个 server 作为开发依赖：

> npm install webpack-dev-server --save-dev

$~~~~$ 安装后，在 webpack.config.js 中添加一个名为 devServer 的部分，指定输出目录以及设置在浏览器中自动打开项目（能在 http://localhost:8080/"直接打开：

> const HtmlWebpackPlugin = require('html-webpack-plugin');
> const path = require('path');
>
> module.exports = {
>
> $~~~~$plugins: [
>
> $~~~~~~$new HtmlWebpackPlugin({
>
> $~~~~~~~~$hash: true,
> $~~~~~~~~$title: 'Webpack Example App',
> $~~~~~~~~$header: 'Webpack Example Title',
> $~~~~~~~~$metaDesc: 'Webpack Example Description',
> $~~~~~~~~$template: './src/index.html',
> $~~~~~~~~$filename: 'index.html',
> $~~~~~~~~$inject: 'body'
> })
> ],
>
> $~~~~$mode: 'development',
> output: {
> $~~~~$clean: true
> },
> devServer: {
> $~~~~$contentBase: './dist',
> $~~~~$open: true
> }
> };

$~~~~$ 最后，在 package.json 中的 scripts 添加 server 配置（dev 的变化，如果需要也可以对生产的 script 进行配置）：

> "scripts": {
> $~~~~$"test": "echo \"Error: no test specified\" && exit 1",
> $~~~~$"dev": "webpack serve --mode development",
> $~~~~$"build": "webpack --mode production"
> },

运行 npm run dev 可以查看重新加载的实时页面。

#### 11. 用 webpack 实现一个示例

$~~~~$ 每次执行 npm run dev 时都会重新运行，执行 npm run build 将在生产中构建脚本。在示例中，将会打包压缩到 dist 文件夹的 index.html。

> <!doctype html>
>
> \<html lang="en">
> $~~~~$\<head>
> $~~~~~~$\<title>Webpack Example App\</title>
>
> $~~~~~~$\<meta charset="UTF-8"/>
> $~~~~~~$\<meta name="viewport" content="width=device-width,initial-scale=1"/>
> $~~~~~~$\<meta name="description" content="Webpack Example Description"/>
>
> $~~~~$\</head>
>
> $~~~~$\<body>
>
> $~~~~~~$\<h1>Webpack Example Title\</h1>
> $~~~~~~$\<div id="wrapper" style="height: 120px">
>
> $~~~~~~~~$\<div class="panel">\</div>
> $~~~~~~~~$\<div class="panel">\</div>
> $~~~~~~~~$\<div class="panel">\</div>
>
> $~~~~~~$\</div>
> $~~~~~~$\<div id="zoom-scene">\</div>
>
> $~~~~~~$\<script defer="defer" src="main.js?097d8b8eda8ecc97a023">\</script>
>
> $~~~~$\</body>
> \</html>
