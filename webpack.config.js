var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, "./entry.js"),
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};