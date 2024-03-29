const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { srcPath, distPath } = require('./path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //抽離css
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        path: distPath,
        // filename: 'bundle.[contenthash:8].js',  // 打包程式碼時，加上 hash 戳
        filename: './js/[name].[contenthash:8].js?',// [name] 會被 entry 中的 key 換調，沒寫預設main.js
        // publicPath: 'http://cdn.abc.com'  // 修改所有靜態文件 url 的前綴（如 cdn 域名），這裡暫時用不到
    },
    module: {
        rules: [
            {
              test:/\.css$/,
              use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
            },
            {
              test:/\.s[ac]ss$/,
              use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader']
            },
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
        }),
        // 抽離css文件設定
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css'
        })
        // new webpack.DefinePlugin({
        //     // window.ENV = 'production'
        //     ENV: JSON.stringify('production'
        // })
    ],
    optimization: {
      // 分割程式碼模組
      splitChunks: {
          chunks: 'all', //全部都管
          /**
           * initial 入口chunk，對於非同步導入的文件不處理
              async 分同步chunk，只對非同步導入的文件處理
              all 全部chunk
           */
          // 缓存分组
          cacheGroups: {
              // 第三方模組
              vendor: {
                  test: /node_modules/,
                  name: 'vendor', // chunk 名稱
                  chunks: 'initial',
                  enforce: true,
                  priority: 1, // 權限更高，優先抽離，重要
                  minSize: 0,  // 大小限制
                  minChunks: 1  // 最少複用過幾次
              },
              // 公共的模塊
              common: {
                  name: 'common', // chunk 名稱
                  priority: 0, // 優先級
                  minSize: 0,  // 公共模塊的大小限制
                  minChunks: 2  // 公共模塊最少複用過幾次
              }
          }
      },
      // 壓縮css
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
})
