const os = require('os');
const webpackMerge = require('webpack-merge');
const devConfig = require('./config.dev');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const DebugInjectPlugin = require('./debug-script-inject-plugin');

function getIp() {
  var addrMap = os.networkInterfaces();
  var keys = Object.keys(addrMap);
  var ip;

  keys.forEach(function (key) {
    addrMap[key].forEach(function (addr) {
      if (addr.address !== '127.0.0.0' && addr.family === 'IPv4' &&
        !addr.internal) {
        ip = addr.address;
      }
    });
  });

  return ip;
}

const ip = getIp();
const debugScript = 'http://' + ip + ':3002/target/target-script-min.js#browsersync';
const debugConfig = webpackMerge(devConfig, {
  plugins: [
    new DebugInjectPlugin({
      scripts: [debugScript]
    }),
    new BrowserSyncPlugin({
      ui: {
        port: 3001,
        weinre: {
          port: 3002
        }
      },
      host: '0.0.0.0',
      port: 3003,
      proxy: 'http://localhost:3000/',
      // open: 'http://localhost:3001/remote-debug'
      open: false
    }, {
      reload: false
    })
  ]
});

module.exports = debugConfig;
