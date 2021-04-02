const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { srcPath, distPath } = require('./path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contenthash:8].js',  // 打包程式碼時，加上 hash 戳
        // filename: './js/[name].js?[contenthash:8]',
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
        rules: [
            // 圖片 - 考慮 base64 編碼的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                  {
                    loader: 'url-loader', // 代替file-loader
                    options: {
                        // 小於 5kb 的圖片用 base64 格式產出
                        // 否則，依然延用 file-loader 的形式，產出 url 格式
                        limit: 5 * 1024,

                        // 可打包到 img 目录下
                        // outputPath: '/img/',
                        context: path.resolve(__dirname, 'src'),
                        name: '[path][name].[ext]?[hash]',

                        // 設置圖片的 cdn 地址（也可以統一在外面的 output 中設置，那將作用于所有靜態資源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                  },
                  {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        }
                    }
                  },
                ]
            },
            {
              test: /\.(tiff|ico|svg|eot|otf|ttf|woff|woff2)$/,
              use: {
              // use: [
                // {
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]?[hash]'
                //   }
                }
              // ]
              }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 會默認清空 output.path 文件夾
        new CopyWebpackPlugin({
          patterns:[ //新版寫法
            {
              from:'src/assets/static',
              to: 'assets/static',
              noErrorOnMissing: true //避免ERROR in unable to locate/assets/static' glob
            }
          ]
        })
        // new webpack.DefinePlugin({
        //     // window.ENV = 'production'
        //     ENV: JSON.stringify('production'
        // })
    ]
})
