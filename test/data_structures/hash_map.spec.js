/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';

import crypto from 'crypto';
import HashMap from '../../src/data_structures/hash_map';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let hashMap, expectedKey, key1, key2, spy;
let value1, value2, value4;

describe('HashMap', () => {
  describe('When initializing a hash map', () => {
    describe('without any values', () => {
      it('should have a length of 0', () => {
        hashMap = new HashMap();
        expect(hashMap.length).to.be.equal(0);
      });
    });

    describe('with an array of values', () => {
      it('should have the correct length', () => {
        hashMap = new HashMap({values: [1, 2, 3]});
        expect(hashMap.length).to.be.equal(3);
      });
    });
  });

  describe('#createKey', () => {
    before(() => {
      hashMap = new HashMap();
    });

    it('uses crypto#createHash with a hex digest', () => {
      key1 = hashMap.createKey(1);
      expectedKey = crypto.createHash('sha256').update('1').digest('hex');

      expect(key1).to.be.equal(expectedKey);;
    });

    it('creates a unique key given an integer', () => {
      key1 = hashMap.createKey(1);
      key2 = hashMap.createKey(1);

      expect(key1).to.be.equal(key2);
    });

    it('does not ignore the order of array elements', () => {
      key1 = hashMap.createKey(['a', 1]);
      key2 = hashMap.createKey([1, 'a']);

      expect(key1).to.not.equal(key2);
    });

    it('creates a unique key for objects', () => {
      key1 = hashMap.createKey({a: 'a', b: 1});
      key2 = hashMap.createKey({b: 1, a: 'a'});

      expect(key1).to.be.equal(key2);
    });
  });

  describe('When using the #getKey method', () => {
    it('should call #createKey with the given value', () => {
      hashMap = new HashMap();
      spy = chai.spy.on(hashMap, 'createKey');
      hashMap.getKey(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });

  describe('#addValue', () => {
    before(() => {
      hashMap = new HashMap();
      value1 = hashMap.addValue(1);
      key1 = hashMap.createKey(1);
    });

    it('should add a new value to the cache', () => {
      expect(hashMap.cache[key1]).to.be.equal(1);
    });

    it('should return the newly added value', () => {
      expect(value1).to.be.equal(1);
    });
  });

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

  describe('#getValue', () => {
    before(() => {
      hashMap = new HashMap({values: [1, 3]});
      key1 = hashMap.createKey(1);
      key2 = hashMap.createKey(2);
    });

    it('should return the value if its key exists in the cache', () => {
      expect(hashMap.getValue(key1)).to.be.equal(1);
    });

    it('should return null if the key does not exist in the cache', () => {
      expect(hashMap.getValue(key2)).to.be.null;
    });
  });

  describe('#hasKey', () => {
    it('should return true if the cache has the key', () => {
      hashMap = new HashMap({values: [1, 2, 3]});
      key1 = hashMap.createKey(1);

      expect(hashMap.hasKey(key1)).to.be.true;
    });
  });

  describe('#hasValue', () => {
    it('should return true if the cache has the key', () => {
      hashMap = new HashMap({values: [1, 2, 3]});

      expect(hashMap.hasValue(1)).to.be.true;
    });
  });

  describe('#includes', () => {
    it('should call #hasValue with the given value', () => {
      hashMap = new HashMap({values: [1, 2, 3]});
      spy = chai.spy.on(hashMap, 'hasValue');
      hashMap.includes(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });

  describe('#remove', () => {
    before(() => {
      hashMap = new HashMap({values: [1, 2, 3]});
      value2 = hashMap.remove(2);
      value4 = hashMap.remove(4);
    });

    it('should remove a value if it exists in the cache', () => {
      expect(hashMap.hasValue(2)).to.be.false;
    });

    it('should reduce the length if the value existed', () => {
      expect(hashMap.length).to.be.equal(2);
    });

    it('should return the removed value if it existed', () => {
      expect(value2).to.be.equal(2);
    });

    it('should return null if the value did not exist', () => {
      expect(value4).to.be.null;
    });
  });

  describe('#delete', () => {
    before(() => {
      hashMap = new HashMap({values: [1, 2, 3]});
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
});
