const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const util = require('./util');
let entryMap = util.getEntries(path.resolve(__dirname, '../src/views'));
const chunks = Object.keys(entryMap);

entryMap['vendor'] = [];

const commonConfig = {
  context: __dirname,

  entry: entryMap,

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?(#.*)?$/,
        loader: 'url?name=[name].[hash].[ext]'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.less', '.css']
  },

  plugins: [
    // 第 1 种方法：

    // 把项目所依赖的第三方类库或者一般不会怎么修改的公共类库打包在一起
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity
    // }),

    // // 把项目的公共模块（现在的配置被是 2 个模块以上共享的模块）打包在一起
    // new webpack.optimize.CommonsChunkPlugin({
    //   children: true,
    //   minChunks: 2
    // })

    // 第 2 种方法：

    // 把项目所依赖的第三方类库或者一般不会怎么修改的公共类库打包在一起
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity
    // }),

    // // 把项目的公共模块（现在的配置被是 2 个模块以上共享的模块）打包在一起
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons',
    //   filename: 'commons.js',
    //   minChunks: 2
    // })

    // 第 3 种方法：

    // 把项目所依赖的第三方类库或者一般不会怎么修改的公共类库打包在一起
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity
    // }),

    // // 把项目的公共模块（现在的配置被是 2 个模块以上共享的模块）打包在一起
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons',
    //   filename: 'commons.js',
    //   minChunks: 2,
    //   chunks: ['vendor', 'home', 'admin', 'about']
    // })

    // 第 4 种方法：这种和想要的最接近

    // 把项目所依赖的第三方类库或者一般不会怎么修改的公共类库打包在一起
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        if ((module.context.indexOf('/node_modules') !== -1 ||
          module.context.indexOf('/vendor') !== -1) && count > 1) {
          return true;
        }
      }
    }),

    // 把项目的公共模块（现在的配置被是 2 个模块以上共享的模块）打包在一起
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 2,
      chunks: chunks
    })


    // 第 5 种方法：

    // 把项目的公共模块（现在的配置被是 2 个模块以上共享的模块）打包在一起
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons',
    //   filename: 'commons.js',
    //   minChunks: 2
    // }),

    // // 把项目所依赖的第三方类库或者一般不会怎么修改的公共类库打包在一起
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity
    // })
  ].concat(util.getHtmlWebpackPlugins(path.resolve(__dirname, '../views'))),

  postcss: [autoprefixer]
};

module.exports = commonConfig;
