/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';

import crypto from 'crypto';
import HashMap from '../../src/helper_structures/hash_map';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let hashMap, expectedKey, key1, key2, spy;

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
    it('should add a new value to the cache', () => {
      hashMap = new HashMap();
      hashMap.addValue(1);
      key1 = hashMap.createKey(1);

      expect(hashMap.cache[key1]).to.be.equal(1);
    });
  });

  describe('#add', () => {
    it('should call #addValue with the given value', () => {
      hashMap = new HashMap();
      spy = chai.spy.on(hashMap, 'addValue');
      hashMap.add(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });

  describe('#insert', () => {
    it('should call #addValue with the given value', () => {
      hashMap = new HashMap();
      spy = chai.spy.on(hashMap, 'addValue');
      hashMap.insert(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });

  describe('#getValue', () => {
    it('should add a new value to the cache', () => {
      hashMap = new HashMap({values: [1, 2, 3]});
      key1 = hashMap.createKey(1);

      expect(hashMap.getValue(key1)).to.be.equal(1);
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
      hashMap.remove(2);
      hashMap.remove(4);
    });

    it('should remove a value if it exists in the cache', () => {
      expect(hashMap.hasValue(2)).to.be.false;
    });

    it('should reduce the length if the value existed', () => {
      expect(hashMap.length).to.be.equal(2);
    });
  });

  describe('#delete', () => {
    it('should call #remove with the given value', () => {
      hashMap = new HashMap({values: [1, 2, 3]});
      spy = chai.spy.on(hashMap, 'remove');
      hashMap.delete(1);

      expect(spy).to.have.been.called.once.with(1);
    });
  });
});
