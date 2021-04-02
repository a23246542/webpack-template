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
          loader:'babel-loader?cacheDirectory',// 開啟緩存
          options: {
            presets:['@babel/preset-env'],// 代替.babelrc
            plugins:['@babel/plugin-proposal-class-properties']
          }
        },
        // include: srcPath,
        exclude: /node_modules/ // 排除範圍，擇其一
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
      chunks: ['index'], // 不需再考慮程式碼分割
      minify: {
        collapseComments: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeTagWhitespace: true,
      }
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
  
}