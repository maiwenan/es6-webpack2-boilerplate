const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(viewPath, devScript) {
  var dirs = fs.readdirSync(viewPath);
  var entryMap = {};

  dirs.forEach(function (dir) {
    var urls = devScript ? [devScript] : [];

    // 忽略 viewPath 目录下的直接子文件，只算直接子文件夹
    if (dir.indexOf('.') === -1) {
      entryMap[dir] = urls.concat([path.resolve(viewPath, dir + '/index')]);
    }
  });

  return entryMap;
}

function excludeVal(values, val) {
  const results = values.map(page => {
    if (page !== val) {
      return page.split('.')[0];
    }
  }).filter(chunk => !!chunk);

  return results;
}

function getHtmlWebpackPlugins(pageDir, template) {
  var pages = fs.readdirSync(pageDir);
  var plugins = [];

  pages.forEach(function (page, i) {
    // 忽略 pageDir 下的文件夹，只算直接子文件
    if (page.indexOf('.') !== -1) {
      plugins.push(new HtmlWebpackPlugin({
        template: template || path.resolve(pageDir, page),
        filename: page,
        excludeChunks: excludeVal(pages, page),
        inject: true
      }));
    }
  });

  return plugins;
}

exports.getEntries = getEntries;
exports.getHtmlWebpackPlugins = getHtmlWebpackPlugins;
