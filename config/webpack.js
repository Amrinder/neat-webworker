var path = require('path');
var TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: {
        'worker': './src/default/default-worker-proxy/default-object-factory-worker-proxy.ts'
    },

    resolve: {
        extensions: [
            '.js', '.ts'
        ],
        plugins: [
            new TsConfigPathsPlugin({
                configFile: './config/tsconfig.json'
            })
        ]
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'config/tsconfig.json'
                    }
                }]
            }
        ]
    }
};