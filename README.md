# webpack

详情了解官方介绍[webpack](https://webpack.github.io/)

### 安装

```bash
$ npm install webpack -g
```

### 演示

单文件编译

```bash
$ cat index.html
```

```html
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
    </body>
</html>
```

```bash
$ cd webpack && cat entry.js

$ echo "document.write('It works.');" >> entry.js 

$ webpack ./entry.js bundle.js
```

多文件编译

```bash
$ vim content.js

$ echo "document.write('\<br\>');" >> content.js;

$ echo "module.exports = 'It works from content.js.'" >> content.js;

$ echo "document.write(require('./content.js'))" >> entry.js;

$ webpack ./entry.js bundle.js
```


CSS样式编译

* css-loader : 解决加载进来的CSS样式导入问题，常见的比如url

* style-loader : 以style样式标签的形式导出到DOM中

* less-loader : 加载编译less文件

* sass-loader: 加载编译sass文件

* 多个loader一起使用用!关联起来

```bash
$ npm install css-loader style-loader --save

$ echo "require('!style!css!./style.css')" >> entry.js

$ webpack ./entry.js bundle.js
```


绑定脚本


```js
entry.js

-----------------------------------------

require("./style.css");
document.write('It works.');
document.write('<br>');
document.write(require('./content.js'));

-----------------------------------------
```

```bash
$  webpack ./entry.js bundle.js --module-bind 'css=style!css'
```

使用配置文件

```js
$ cat webpack.config.js

-----------------------------------------

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader:['style','css'] }
        ]
    }
};

-----------------------------------------

# 输出进度

$ webpack --progress --colors

# 输出进度，同时监控

$ webpack --progress --colors --watch
```


使用require引入loader

```js
# 使用loader.js转化到dir目录下的file.txt文件

require("./loader!./dir/file.txt");

# 使用jade-loader编译当前目录下的template.jade模版

require("jade!./template.jade");

# 从后向前解析，多个解析方式第一个加！

# 编译bootstrop目录下的less文件夹中的bootstrap.less文件，然后使用css-loader转化导入文件，

# 最后使用style-loader输出到DOM中

require("!style!css!less!bootstrap/less/bootstrap.less");
```

configuration方式引入loader

```js
{
    module: {
        loaders: [
            { test: /\.jade$/, loader: "jade" },
            { test: /\.css$/, loaders: ["less", "css","style"] },
        ]
    }
}

```

转化ES2015使用支持Babel

```bash
# 根目录下创建.babelrc文件

$ cat .babelrc

$ echo { "presets": [ "es2015" ] } >> .babelrc

----------------------------------------------

# 配置webpack使用babel处理所有的JS文件

 module.exports = {
     entry: './src/app.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel'
         }]
     }
 }
```

使用plugins

```bash
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './bin',
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
}
```

## 使用场景分析

webpack在Laravel5.3中的应用

webpack在React Native中的应用

webpack在Angular2中的应用

webpack在Vue中的应用

## 调试

```js
$ npm i webpack-dev-server --save

----------------------------------------------

//添加脚本服务webpack-dev-server（http://localhost:8080）
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
  }
}
```

(Loaders)[https://webpack.github.io/docs/list-of-loaders.html]