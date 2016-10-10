# webpack

详情了解官方介绍[webpack](https://webpack.github.io/)

### 安装

> npm install webpack -g

### 使用

单文件编译:

> cat index.html

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

> cd webpack && cat entry.js

> echo "document.write('It works.');" >> entry.js 

> webpack ./entry.js bundle.js


多文件编译：

> vim content.js

> echo "document.write('\<br\>');" >> content.js;

> echo "module.exports = 'It works from content.js.'" >> content.js;

> webpack ./entry.js bundle.js

CSS文件编译：

* css-loader
* style-loader
* less-loader
* sass-loader

> npm install css-loader style-loader -g

