/* eslint-disable node/no-unpublished-import, import/no-extraneous-dependencies */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { merge } from 'webpack-merge';

import paths from './paths';
import common from './webpack.common';

module.exports = merge(common, {
    mode:    'production',
    devtool: false,
    output:  {
        path:       paths.build,
        publicPath: '/',
        filename:   'js/[name].[contenthash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use:  [
                    MiniCssExtractPlugin.loader,
                    {
                        loader:  'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap:     false,
                            modules:       false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:      'styles/[name].[contenthash].css',
            chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        minimize:     true,
        minimizer:    [new CssMinimizerPlugin(), '...'],
        runtimeChunk: {
            name: 'runtime',
        },
    },
    performance: {
        hints:             false,
        maxEntrypointSize: 512000,
        maxAssetSize:      512000,
    },
});
