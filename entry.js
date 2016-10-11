//使用style-loader && css-loader编译器
//require("!style!css!./style.css");
//脚本编译执行

require("./style.css");
document.write('It works.');
document.write('<br>');
document.write('<br>');
document.write(require('./content.js'));