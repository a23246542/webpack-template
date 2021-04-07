const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./path');

module.exports = merge(webpackCommonConf,{
  mode:'development',
  module: {
    rules: [
        {
          test:/\.css$/,
          use:['style-loader','css-loader','postcss-loader']
        },
        {
          test:/\.s[ac]ss$/,
          // test:/\.(sass|scss)$/,
          use:['style-loader','css-loader','postcss-loader','sass-loader']
        },
        // 直接引入圖片 url
        {
            // test: /\.(png|jpg|jpeg|gif)$/,
            test: /\.(jpg|jpeg|png|gif|tiff|ico|svg|eot|otf|ttf|woff|woff2)$/,
            // use: 'file-loader',
            use: {
              loader:'file-loader',
              options: {
                context: path.resolve(__dirname, 'src'),
                name: '[path][name].[ext]?[hash:8]',
              },
            }
        }
    ]
  },
  // plugins: [
  //     new webpack.DefinePlugin({
  //         // window.ENV = 'production'
  //         ENV: JSON.stringify('development')
  //     })
  // ],
  devServer: {
      port: 8080,
      contentBase: distPath,  // 根目錄(設定當前的目錄)
      open: true,  // 自動打開瀏覽器
      progress: true,  // 顯示打包的進度條
      compress: false,  // 啟動 gzip 壓縮
      // 设置代理
      proxy: {
          // 將本地 /api/xxx 代理到 localhost:3000/api/xxx
          '/api': 'http://localhost:3000',
          // 將本地 /api2/xxx 代理到 localhost:3000/xxx
          '/api2': {
              target: 'http://localhost:3000',
              pathRewrite: {
                  '/api2': ''
              }
          }
      }
  }
})