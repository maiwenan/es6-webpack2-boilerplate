import {
  expect
} from 'chai';
import home from '../../src/views/home';

describe('test home', () => {
  it('test home fn', () => {
    expect(home()).to.equal('home');
  });
});
