const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./path')

module.exports = {
  mode:'development',
  entry:path.join(srcPath,'index.js'),
  output: {
    filename:'bundle.js',
    path: distPath
  },
  // resolve: {
  //   extensions: ['.js', '.jsx', '.json'],
  //   alias: {
  //     '@':srcPath,
  //   },
  // },
  plugins:[
    new HtmlWebpackPlugin({
      template:`${srcPath}/index.html`,
      filename:'index.html'
    })
  ],
  devServer: { //啟動本地服務
    port: 8080,
    contentBase:distPath,//設定當前的目錄是什麼
    open: true, //自動打開瀏覽器
  }
}