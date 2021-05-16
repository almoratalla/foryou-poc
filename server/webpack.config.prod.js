const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: "./src/public/scripts/app.js",
    // {https://webpack.js.org/guides/code-splitting/ }
    // https://webpack.js.org/concepts/#entry
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'dist', 'public', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    // devtool: "cheap-source-map",
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
};