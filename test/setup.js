import {
  jsdom
} from 'jsdom';
const exposedProps = ['window', 'navigator', 'document'];
const extensions = ['.css', '.scss', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.eot', '.ttf', '.woff'];
const noop = () => {};

// ignore other resources
extensions.forEach(ext => {
  require.extensions[ext] = noop;
});

// 模拟浏览器环境
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(prop => {
  if (typeof global[prop] === 'undefined') {
    exposedProps.push(prop);
    global[prop] = document.defaultView[prop];
  }
});
global.navigator = {
  userAgent: 'node.js'
};
