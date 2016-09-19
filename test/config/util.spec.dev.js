import path from 'path';
import {
  expect
} from 'chai';
import {
  getEntries,
  getHtmlWebpackPlugins
} from '../../config/util';

describe('test util.js', () => {
  it('test getEntries fn', () => {
    const viewDir = path.resolve(__dirname, '../../src/views');
    const entries = getEntries(viewDir);

    expect(entries).to.have.all.keys('about', 'admin', 'home');
    expect(entries['home']).to.deep.equal([path.resolve(viewDir, './home/index')]);
  });

  it('test getHtmlWebpackPlugins fn', () => {
    const pageDir = path.resolve(__dirname, '../../views');
    const plugins = getHtmlWebpackPlugins(pageDir);

    expect(plugins.length).to.equal(3);
  });
});
