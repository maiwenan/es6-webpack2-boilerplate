const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./config.common');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassExtract = new ExtractTextPlugin('[name].[chunkhash:8].css');
const lessExtract = new ExtractTextPlugin('[name].[chunkhash:8].css');
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    plugins: function () {
      return [autoprefixer];
    }
  }
};

const devConfig = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    sourceMapFilename: '[name].[chunkhash:8].map',
    chunkFilename: '[id].[chunkhash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: sassExtract.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?minimize&sourceMap&importLoaders=2',
            postcssConfig
          ]
        })
      },
      {
        test: /\.scss$/,
        loader: sassExtract.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?minimize&sourceMap&importLoaders=2',
            postcssConfig,
            'sass-loader?outputStyle=expanded&sourceMap&sourceMapContents'
          ]
        })
      },
      {
        test: /\.less/,
        loaders: lessExtract.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?minimize&sourceMap&importLoaders=2',
            postcssConfig,
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
