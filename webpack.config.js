/*
 * @Explain: 
 * @version: 
 * @Author: SuperLy
 * @Date: 2022-01-16 20:41:32
 * @LastEditors: SuperLy
 * @LastEditTime: 2022-01-22 21:19:48
 */
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // 入口文件
    entry: './src/index.ts',
    output: {
        // 输出文件名
        filename: './src/js/index.js',
        // 输出到目录
        path: path.resolve(__dirname, './dist'),
        // 打包前先清理dist文件夹
        clean: true,
        // 告诉webpack不使用箭头
        environment: {
            arrowFunction: false,
            // 不使用const,此时兼容IE 10
            const: false
        }
    },
    // 开发环境
    mode: 'development',
    // 开发工具配置
    devtool: 'inline-source-map',
    // webpack-dev-server
    devServer: {
        // 将 dist 目录下的文件作为 web 服务的根目录
        static: './dist'
    },
    // 设置监听模式
    watch: false,
    // 插件配置
    plugins: [
        // 实例化 html-webpack-plugin 插件，用于生产html 并自动引入资源
        new HtmlWebpackPlugin(
            // 配置对象    
            {
                // 打包所参照的文件，若不配置，则生成一个只有资源引入的 html 文件
                template: './src/index.html',
                // 打包生成的文件名称。默认为index.html
                filename: 'app.html',
                // 设置所有资源文件注入模板的位置。可以设置的值true | 'head' | 'body' | false，默认值为 true
                inject: 'body'
            }
        ),
        // 导出 CSS 插件
        new MiniCssExtractPlugin({
            filename: './src/css/index.css'
        })
    ],
    // 资源模块配置
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }, {
            test: /\.ts$/,
            // 排除 node_modules 中的 js 文件
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }, {
                loader: 'ts-loader'
            }]

        }]
    },
    resolve: {
        extensions: [".ts", '.tsx', '.js']
    }
}