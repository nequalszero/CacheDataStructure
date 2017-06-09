/* global describe, it, before */

import chai from 'chai';
import Cache from '../src/index.js';

chai.expect();

const expect = chai.expect;

let cache;

describe('Given an instance of the cache', () => {
  before(() => {
    cache = new Cache();
  });

  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(cache.name).to.be.equal('Cache');
    });
  });
});
