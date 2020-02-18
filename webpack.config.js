const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'CRM-1551/Conf/Modules/TypeScript'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'CRM-1551\Conf\Modules\JavaScript')
    },

    resolve: {
        extensions: ['.ts']
    },

    module: {
        rules: [
            { test: /\.(js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ]
};
