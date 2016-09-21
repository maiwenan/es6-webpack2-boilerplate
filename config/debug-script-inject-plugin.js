function DebugInjectPlugin(options) {
  this.options = options || {};
}

DebugInjectPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      htmlPluginData.html = self.inject(htmlPluginData);
      callback(null, htmlPluginData);
    });
  });
};

DebugInjectPlugin.prototype.inject = function (htmlPluginData) {
  var options = this.options;
  var html = htmlPluginData.html;
  var re = /<head([^>]*)>([\s\S]*)<\/head>/ig;
  var scripts = options.scripts.map(function (url) {
    return '<script src="' + url + '"></script>';
  });
  var newHtml = html.replace(re, function (match, v1, v2, pos, allstr) {
    return '<head' + v1 + '>' + v2 + scripts + '\n</head>';
  });

  return newHtml;
};

module.exports = DebugInjectPlugin;
