const path = require('path');

module.exports = {
    entry: {
        index: ['@babel/polyfill', './src/index.js'],
        edit: ['@babel/polyfill', './src/edit.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
            publicPath: '/scripts/'
        }
    },
    devtool: 'source-map',
}