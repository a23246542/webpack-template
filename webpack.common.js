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
      chunks: ['vendor','index']
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
  optimization: {
    // 壓縮 css
    // minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

    // 分割程式碼模組
    splitChunks: {
        // chunks: 'all',
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
            // common: {
            //     name: 'common', // chunk 名稱
            //     priority: 0, // 優先級
            //     minSize: 0,  // 公共模塊的大小限制
            //     minChunks: 2  // 公共模塊最少複用過幾次
            // }
        }
    }
  }
}