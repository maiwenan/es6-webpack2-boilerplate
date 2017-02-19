const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./config.common');
const DashboardPlugin = require('webpack-dashboard/plugin');

const devConfig = webpackMerge(commonConfig, {
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
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.less/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new DashboardPlugin()
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    // inline: true,  // 已默认开启
    // hot: true,  // 已默认开启
    historyApiFallback: true
  }
});

module.exports = devConfig;
