# webpack

详情了解官方介绍[webpack](https://webpack.github.io/)

### 安装

```
$ npm install webpack -g
```

### 使用

单文件编译:

```
$ cat index.html
```

```
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
    </body>
</html>
```

```
$ cd webpack && cat entry.js

$ echo "document.write('It works.');" >> entry.js 

$ webpack ./entry.js bundle.js
```

多文件编译：

```
$ vim content.js

$ echo "document.write('\<br\>');" >> content.js;

$ echo "module.exports = 'It works from content.js.'" >> content.js;

$ echo "document.write(require('./content.js'))" >> entry.js;

$ webpack ./entry.js bundle.js
```


CSS样式编译：

* css-loader : 解决加载进来的CSS样式导入问题，常见的比如url
* style-loader : 以style样式标签的形式导出到DOM中
* less-loader : 加载编译less文件
* sass-loader: 加载编译sass文件
* 多个loader一起使用用!关联起来

```
$ npm install css-loader style-loader --save

$ echo "require('!style!css!./style.css')" >> entry.js

$ webpack ./entry.js bundle.js
```


###Loaders

*绑定脚本*


```
entry.js
-----------------------------------------
require("./style.css");
document.write('It works.');
document.write('<br>');
document.write(require('./content.js'));
-----------------------------------------
```

```
$  webpack ./entry.js bundle.js --module-bind 'css=style!css'
```

*使用配置文件*

```
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

*loader引入方式*

* 使用require引入loader

```
# 使用loader.js转化到dir目录下的file.txt文件
require("./loader!./dir/file.txt");

# 使用jade-loader编译当前目录下的template.jade模版
require("jade!./template.jade");

# 从后向前解析，多个解析方式第一个加！
# 编译bootstrop目录下的less文件夹中的bootstrap.less文件，然后使用css-loader转化导入文件，
# 最后使用style-loader输出到DOM中
require("!style!css!less!bootstrap/less/bootstrap.less");
```

* configuration方式

```
{
    module: {
        loaders: [
            { test: /\.jade$/, loader: "jade" },
            { test: /\.css$/, loaders: ["less", "css","style"] },
        ]
    }
}

```


*支持Babel*

```
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


(Loaders)[https://webpack.github.io/docs/list-of-loaders.html]