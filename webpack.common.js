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
  // devServer: { //啟動本地服務
  //   port: 8080,
  //   contentBase:distPath,//設定當前的目錄是什麼
  //   open: true, //自動打開瀏覽器
  // }
}