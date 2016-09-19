// Karma configuration
// Generated on Mon Sep 19 2016 15:51:53 GMT+0800 (CST)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'test.webpack.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
          },
          {
            test: /\.less$/,
            loader: 'style!css!postcss!less'
          },
          {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?(#.*)?$/,
            loader: 'url?name=[name].[hash].[ext]'
          }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.less', '.css']
      },
      postcss: [require('autoprefixer')],
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },


    webpackServer: {
      noInfo: true
    },


    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
