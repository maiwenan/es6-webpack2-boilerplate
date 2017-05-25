const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./config.common');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const lessExtract = new ExtractTextPlugin('[name].[chunkhash:8]-one.css');
const cssExtract = new ExtractTextPlugin('[name].[chunkhash:8]-two.css');
const sassExtract = new ExtractTextPlugin('[name].[chunkhash:8]-three.css');
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    plugins: function () {
      return [autoprefixer];
    }
  }
};

const proConfig = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    sourceMapFilename: '[name].[chunkhash:8].map',
    chunkFilename: '[id].[chunkhash:8].js',
    publicPath: 'http://kfy.qianchuan.info/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssExtract.extract({
          fallbackLoader: 'style-loader',
          use: [
            'css-loader?minimize&sourceMap&importLoaders=1',
            postcssConfig
          ]
        })
      },
      {
        test: /\.scss$/,
        use: sassExtract.extract({
          fallbackLoader: 'style-loader',
          use: [
            'css-loader?minimize&sourceMap&importLoaders=2',
            postcssConfig,
            'sass-loader?outputStyle=expanded&sourceMap&sourceMapContents'
          ]
        })
      },
      {
        test: /\.less/,
        use: lessExtract.extract({
          fallbackLoader: 'style-loader',
          use: [
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
    lessExtract,
    cssExtract,
    sassExtract,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});

module.exports = proConfig;
