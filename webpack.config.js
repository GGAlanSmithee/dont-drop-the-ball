const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

console.log(process.env.NODE_ENV)

module.exports = {
    entry: {
        app: './src/index.jsx'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true, 
        inline: true,
        disableHostCheck: true,
        contentBase: './dist',
        host: process.env.IP,
        port: process.env.PORT
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ],
        mainFields: ['jsnext:main', 'module', 'main']
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.js$|\.jsx$/,
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [
                    ['env', {
                        modules: false,
                        targets: {
                            browsers: ['last 2 version']    
                        }
                    }],
                    'stage-0',
                    'react'
                ],
                plugins: [
                    ['transform-runtime', {
                        polyfill: false,
                        regenerator: true // still needed for import polyfill
                    }]
                ]
            },
            include: path.resolve(__dirname, 'src'),
            exclude: path.resolve(__dirname, 'node_modules')
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV === 'development'
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.HotModuleReplacementPlugin({
        })
    ]
}