const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const { version } = require('./package.json');
process.env.MODULE_VERSION = version;

const binConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/index.ts',
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
        new webpack.EnvironmentPlugin({
            'IS_WEBPACK': true,
            'MODULE_VERSION': version
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'shebang-loader'
                    }
                ]
            }
        ]
    },
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled'),
        filename: 'index.js',
        library: '@eagletrt/cli',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    }
};

module.exports = [
    binConfig
];