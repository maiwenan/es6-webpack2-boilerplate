const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./config.common');
const DashboardPlugin = require('webpack-dashboard/plugin');

const devConfig = webpackMerge(commonConfig, {
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
    }),
    new DashboardPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    // inline: true,  // 已默认开启
    // hot: true,  // 已默认开启
    historyApiFallback: true
  }
});

module.exports = devConfig;
