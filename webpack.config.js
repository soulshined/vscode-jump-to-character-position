const path = require('path')

module.exports = {
    entry: './src/extension.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        clean: true,
    },
    target: 'node',
    mode: 'none',
    externals: {
        vscode: 'commonjs vscode',
    },
    resolve: { extensions: ['.js'] },
    devtool: 'nosources-source-map',
}