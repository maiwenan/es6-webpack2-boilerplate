import {
  expect
} from 'chai';
import {
  welcome,
  unUsed
} from '../../src/components';
import {
  util
} from '../../src/components/util';

describe('test components', () => {
  it('test index.js', () => {
    expect(welcome('test')).to.equal('test');
    expect(unUsed('mocha')).to.equal('mocha');
  });

  it('test util.js', () => {
    expect(util()).to.equal('util');
  });
});
