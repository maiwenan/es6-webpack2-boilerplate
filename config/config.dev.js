const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./config.common');
const util = require('./util');
let entryMap = util.getEntries(path.resolve(__dirname, '../src/views'));

entryMap['vendor'] = ['../src/vendor'];

const devConfig = webpackMerge(commonConfig, {
  context: __dirname,

  entry: entryMap,

  debug: true,

  devtool: 'inline-source-map',

  output: {
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].js'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.less/,
        loaders: ['style', 'css', 'postcss', 'less']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    })
  ].concat(util.getHtmlWebpackPlugins(path.resolve(__dirname, '../views'))),

  devServer: {
    host: 'localhost',
    port: 3000,
    inline: false,  // 已默认开启
    hot: false,  // 已默认开启
    historyApiFallback: true
  }
});

module.exports = devConfig;
