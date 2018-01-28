const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {app: './src/demo/index.js'},
    devtool: 'inline-source-map',
    devServer: {contentBase: './dist'},
    plugins: [new HtmlWebpackPlugin({title: 'html webpack plugin title'})],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css/,
            use: [
                'style-loader', 'css-loader'
            ]
        }]
    }
};