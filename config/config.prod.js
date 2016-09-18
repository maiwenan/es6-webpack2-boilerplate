const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./config.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassExtract = new ExtractTextPlugin('[name].[chunkhash:8].css');
const lessExtract = new ExtractTextPlugin('[name].[chunkhash:8].css');

const devConfig = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    sourceMapFilename: '[name].[chunkhash:8].map',
    chunkFilename: '[id].[chunkhash:8].js'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: sassExtract.extract({
          fallbackLoader: 'style',
          loader: [
            'css-loader?modules&minimize&sourceMap&importLoaders=2',
            'postcss-loader',
            'sass-loader?outputStyle=expanded&sourceMap&sourceMapContents'
          ]
        })
      },
      {
        test: /\.less/,
        loaders: lessExtract.extract({
          fallbackLoader: 'style',
          loader: [
            'css-loader?modules&minimize&sourceMap&importLoaders=2',
            'postcss-loader',
            'less-loader?outputStyle=expanded&sourceMap&sourceMapContents'
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'"
      }
    }),
    new webpack.optimize.DedupePlugin(),
    sassExtract,
    lessExtract,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});

module.exports = devConfig;
