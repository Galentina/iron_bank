/* eslint-disable node/no-unpublished-import, import/no-extraneous-dependencies */
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common';
import paths from './paths';

export default merge(common, {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        historyApiFallback: true,
        contentBase:        paths.build,
        open:               true,
        compress:           true,
        hot:                true,
        port:               8080,
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use:  [
                    'style-loader',
                    {
                        loader:  'css-loader',
                        options: { sourceMap: true, importLoaders: 1, modules: false },
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
        ],
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],
});
