'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    fs = require('fs'),
    srcPath = path.join(__dirname, '../src');

//var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


var appPath = function (s) {
    var x = path.join(__dirname, "./");
    return path.join(x, s);
};

var __appPath = path.join(__dirname, "./");

var isProduction = function () {
    console.log("process.env.NODE_ENV:" + process.env.NODE_ENV);
    var env = process.env.NODE_ENV || "";
    var isRelease = env.trim() === "production";
    console.log("isRelease:", isRelease);
    return isRelease;
};


//打包输出的静态文件的路径
var publicPath = isProduction() ? "/" : "/";

var getLessLoader = function () {
    return {
        test: /\.less?$/,
        loaders: ['style-loader', 'css-loader', 'less-loader?{"sourceMap":true}'],
        include: __appPath
    };
};

var getCssLoader = function () {
    return {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
    };
};

function createWebpackConfig(jsFile, htmlFile) {

    var webpackConfig = {
        target: 'web',
        cache: true,
        entry: {
            'main': appPath(jsFile)
        },

        output: {
            path: path.join(__appPath, 'dist'),
            publicPath: publicPath,
            filename: 'static/[name].[hash].js',//hash
            chunkFilename: 'static/module.[name].[hash].js',
            library: ['Ubibi', '[name]']
        },


        module: {
            loaders: [
                {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?cacheDirectory'},
                {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
                getLessLoader(), getCssLoader(),
                {test: /\.(jpg|png|gif)$/, loader: 'url?limit=100000'},
                {test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}
            ]
        },


        externals: {
            "react": "window.React",
            "react-dom": "window.ReactDOM"
        },


        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: appPath(htmlFile)
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ],
        devtool: isProduction() ? null : 'eval-cheap-module-source-map',
        devServer: {
            port: 5001,
            host: "0.0.0.0",
            contentBase: './',
            historyApiFallback: true,
            proxy: {
                '/cloud/*': {
                    target: 'http://127.0.0.1:10086',
                    secure: false,
                    changeOrigin: true
                },
                '/robot/index': {
                    target: 'http://op.juhe.cn',
                    secure: false,
                    changeOrigin: true
                }
            }
        }
    };

    return webpackConfig;
}


var webpackConfig = createWebpackConfig("example/index.js", 'example/index.html');

module.exports = webpackConfig;