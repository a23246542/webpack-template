const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./path')


module.exports = {
  mode:'development',
  // entry:path.join(srcPath,'index.js'),
  entry: {
    index: path.join(srcPath,'index'),
    about: path.join(srcPath,'about'),
  },
  // output: {
  //   filename:'bundle.js',
  //   path: `${distPath}/js`
  //   // path: distPath
  // },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader']
      },
      {
        test:/\.s[ac]ss$/,
        // test:/\.(sass|scss)$/,
        use:['style-loader','css-loader','postcss-loader','sass-loader']
      },
      {
        test:/\.js$/,
        use: {
          loader:'babel-loader',
          options: {
            presets:['@babel/preset-env'],// 代替.babelrc
            plugins:['@babel/plugin-proposal-class-properties']
          }
        },
        include: srcPath,
        exclude: /node_modules/
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif|tiff|ico|svg|eot|otf|ttf|woff|woff2)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         context: path.resolve(__dirname, 'src'),
      //         name: '[path][name].[ext]?[hash]',
      //       },
      //     },
      //   ],
      // },
    ]
  },
  resolve: {
    // modules:[
    //   // path.resolve(srcPath)
    //   // path.resolve('node_modules')
    // ],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@':srcPath,
    },
  },
  plugins:[
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack前端自動化開發-首頁',
      filename:'index.html', //要生成的檔案
      template:`${srcPath}/html/index.html`, //模板來源
      //chunks 表示該頁面要引用哪些 chunks，默認全部引用
      chunks: ['index']
    }),
    // new HtmlWebpackPlugin({ //多入口單純產生html，同樣會引入main.js
    //   filename: 'about.html'
    // })
    new HtmlWebpackPlugin({
      title: '關於我們',
      filename: 'about.html',
      template:`${srcPath}/html/about.html`,
      chunks:['about'],
    })
  ],
  // devServer: { //啟動本地服務
  //   port: 8080,
  //   contentBase:distPath,//設定當前的目錄是什麼
  //   open: true, //自動打開瀏覽器
  // }
}