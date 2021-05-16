const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/public/scripts/script.js",
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist', 'public', 'scripts'),
        // publicPath: 'build'
    },
    devtool: "eval-cheap-module-source-map",
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ],
    devServer: {
        port: 7000,
        historyApiFallback: {
            index: "index.html"
        }
    }
};