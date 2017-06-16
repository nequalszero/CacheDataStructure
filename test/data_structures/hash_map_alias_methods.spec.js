/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';

import HashMap from '../../src/data_structures/hash_map';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let hashMap, spy;
let value1;

describe('HashMap alias methods', () => {
  describe('#add', () => {
    before(() => {
      hashMap = new HashMap();
      spy = chai.spy.on(hashMap, 'addValue');
      value1 = hashMap.add(1);
    });

    it('should call #addValue with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the newly added value', () => {
      expect(value1).to.be.equal(1);
    });
  });

  describe('#contains', () => {
    it('should call #hasValue with the given value', () => {
      hashMap = new HashMap([1, 2, 3]);
      spy = chai.spy.on(hashMap, 'hasValue');
      hashMap.contains(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });

  describe('#delete', () => {
    before(() => {
      hashMap = new HashMap([1, 2, 3]);
      spy = chai.spy.on(hashMap, 'remove');
      value1 = hashMap.delete(1);
    });

    it('should call #remove with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the value returned by the #remove method', () => {
      expect(value1).to.be.equal(1);
    });
  });

  describe('#getKey', () => {
    it('should call #createKey with the given value', () => {
      hashMap = new HashMap();
      spy = chai.spy.on(hashMap, 'createKey');
      hashMap.getKey(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });

  describe('#include', () => {
    it('should call #hasValue with the given value', () => {
      hashMap = new HashMap([1, 2, 3]);
      spy = chai.spy.on(hashMap, 'hasValue');
      hashMap.include(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });

  describe('#includes', () => {
    it('should call #hasValue with the given value', () => {
      hashMap = new HashMap([1, 2, 3]);
      spy = chai.spy.on(hashMap, 'hasValue');
      hashMap.includes(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });

  describe('#insert', () => {
    before(() => {
      hashMap = new HashMap();
      spy = chai.spy.on(hashMap, 'addValue');
      value1 = hashMap.insert(1);
    });

    it('should call #addValue with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the newly added value', () => {
      expect(value1).to.be.equal(1);
    });
  });
});
