/* eslint-disable node/no-unpublished-import, import/no-extraneous-dependencies */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import paths from './paths';

export default {
    entry: {
        index: `${paths.src}/index/scripts/index.ts`,
        issueCard: `${paths.src}/issue-card/scripts/index.ts`,
        cards: `${paths.src}/cards/scripts/index.ts`,
        dashboard: `${paths.src}/dashboard/scripts/index.ts`,
        payments: `${paths.src}/payments/scripts/index.ts`,
    },

    output: {
        path:       paths.build,
        filename:   '[name].bundle.js',
        publicPath: '/',
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from:        paths.public,
                    to:          '.',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),

        new HtmlWebpackPlugin({
            chunks:   ['index'],
            favicon:  `${paths.public}/img/favicon.ico`,
            template: `${paths.src}/index/index.html`,
            filename: 'index.html',
        }),

        new HtmlWebpackPlugin({
            chunks:   ['issueCard'],
            favicon:  `${paths.public}/img/favicon.ico`,
            template: `${paths.src}/issue-card/index.html`,
            filename: 'issue-card.html',
        }),

        new HtmlWebpackPlugin({
            chunks:   ['cards'],
            favicon:  `${paths.public}/img/favicon.ico`,
            template: `${paths.src}/cards/index.html`,
            filename: 'cards.html',
        }),

        new HtmlWebpackPlugin({
            chunks:   ['dashboard'],
            favicon:  `${paths.public}/img/favicon.ico`,
            template: `${paths.src}/dashboard/index.html`,
            filename: 'dashboard.html',
        }),

        new HtmlWebpackPlugin({
            chunks:   ['payments'],
            favicon:  `${paths.public}/img/favicon.ico`,
            template: `${paths.src}/payments/index.html`,
            filename: 'payments.html',
        }),

        new ESLintPlugin({
            files:     ['.', 'src', 'config'],
            formatter: 'table',
        }),
    ],

    module: {
        rules: [
            {
                test:    /\.ts?$/,
                use:     'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.js$/,
                use:  ['babel-loader'],
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },

    resolve: {
        modules:    [paths.src, 'node_modules'],
        extensions: ['.js', '.ts', '.json'],
        alias:      {
            '@src': paths.src,
        },
    },
};
