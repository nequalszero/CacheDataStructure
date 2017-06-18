/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';

import crypto from 'crypto';
import HashMap from '../../src/data_structures/hash_map';
import isEqual from 'lodash/isEqual';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let hashMap, hashMap1, spy, errorFn, result;
let cb, cb1;
let expectedKey, key1, key2, key3;
let values, value1, value2, value3, value4;

describe('HashMap', () => {
  describe('When initializing a hash map', () => {
    describe('with invalid params', () => {
      describe('when params is not an object', () => {
        it('should throw a TypeError', () => {
          errorFn = () => { hashMap = new HashMap([1, 2, 3]); };
          expect(errorFn).to.throw(TypeError);
        });
      });

      describe('when values is not an array', () => {
        it('should throw a TypeError', () => {
          errorFn = () => { hashMap = new HashMap({values: 5}); };
          expect(errorFn).to.throw(TypeError);
        });
      });

      describe('when keyGenerator is not a function', () => {
        it('should throw a TypeError', () => {
          errorFn = () => { hashMap = new HashMap({keyGenerator: 1}); };
          expect(errorFn).to.throw(TypeError);
        });
      });
    });

    describe('with valid params', () => {
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

      describe('with a keyGenerator', () => {
        it('should override the default keyGenerator', () => {
          cb = ((node) => (node.value));
          hashMap = new HashMap({ keyGenerator: cb });

          expect(hashMap.keyGenerator).to.be.equal(cb);
        });
      });
    });
  });

  describe('Getter methods', () => {
    before(() => {
      values = [1, 2, 3];
      hashMap = new HashMap({ values });
    });

    describe('.cache', () => {
      it('should return the hashmap cache', () => {
        result = {};
        values.forEach((val) => { result[hashMap.createKey(val)] = val; });
        expect(isEqual(hashMap.cache, result)).to.be.true;
      });
    });

    describe('.keys', () => {
      it('should return the keys in the hashmap cache', () => {
        result = [];
        values.forEach((val) => { result.push(hashMap.createKey(val)); });
        expect(hashMap.keys).to.include.members(result);
        expect(hashMap.keys.length).to.be.equal(3);
      });
    });

    describe('.keyGenerator', () => {
      it('should return the keyGenerator function for the hashmap', () => {
        cb1 = (val) => (val.id);
        hashMap1 = new HashMap({ keyGenerator: cb1 });

        expect(cb1).to.be.equal(hashMap1.keyGenerator);
      });
    });

    describe('.length', () => {
      it('should return the length of the hashmap', () => {
        expect(hashMap.length).to.be.equal(3);
      });
    });

    describe('.values', () => {
      it('should return the values in the hashmap cache', () => {
        expect(hashMap.values).to.include.members(values);
        expect(hashMap.values.length).to.be.equal(3);
      });
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

  describe('#createKey', () => {
    describe('When using the default keyGenerator', () => {
      before(() => {
        hashMap = new HashMap();
      });

      it('uses crypto#createHash with a hex digest', () => {
        key1 = hashMap.createKey(123456);
        expectedKey = crypto.createHash('sha256').update('123456').digest('hex');

        expect(key1).to.be.equal(expectedKey);;
      });

      it('creates a unique key given an integer', () => {
        key1 = hashMap.createKey(123);
        key2 = hashMap.createKey(123);

        expect(key1).to.be.equal(key2);
      });

      it('creates a unique key given an array of integers', () => {
        key1 = hashMap.createKey([1, 2, 3, 4, 5]);
        key2 = hashMap.createKey([1, 2, 3, 4, 5]);

        expect(key1).to.be.equal(key2);
      });

      it('creates a unique key for objects', () => {
        key1 = hashMap.createKey({a: 'a', b: 1});
        key2 = hashMap.createKey({a: 'a', b: 1});

        expect(key1).to.be.equal(key2);
      });

      it('creates a unique key given an array of objects', () => {
        key1 = hashMap.createKey([{id: 1, name: 'Alan'}, {name: 'Jane', id: 2}, {id: 3, name: 'Kelley'}]);
        key2 = hashMap.createKey([{id: 1, name: 'Alan'}, {name: 'Jane', id: 2}, {id: 3, name: 'Kelley'}]);

        expect(key1).to.be.equal(key2);
      });

      it('does not ignore the ordering of array elements', () => {
        key1 = hashMap.createKey(['a', 1]);
        key2 = hashMap.createKey([1, 'a']);

        expect(key1).to.not.equal(key2);
      });
    });

    describe('When using a custom keyGenerator', () => {
      before(() => {
        value1 = {id: 1, firstName: 'Chris', lastName: 'Lee'};
        value2 = {id: 2, firstName: 'Jane', lastName: 'Doe'};
        value3 = {id: 3, firstName: 'chris', lastName: 'lee'};
        hashMap = new HashMap({ keyGenerator: (value) => (
          `${value.firstName.toLowerCase()} ${value.lastName.toLowerCase()}`
        )});
      });

      it('should create matching keys according to the keyGenerator', () => {
        key1 = hashMap.createKey(value1);
        key3 = hashMap.createKey(value3);

        expect(key1).to.be.equal(key3);
      });

      it('should create different keys according to the keyGenerator', () => {
        key1 = hashMap.createKey(value1);
        key2 = hashMap.createKey(value2);

        expect(key1).not.to.be.equal(key2);
      });
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
    describe('When the value exists', () => {
      before(() => {
        hashMap = new HashMap({values: [1, 2, 3]});
      });

      it('should call createKey with the value passed in', () => {
        spy = chai.spy.on(hashMap, 'createKey');
        hashMap.hasValue(1);

        expect(spy).to.have.been.called.once.with(1);
      });

      it('should call hasKey with the key associated with the value passed in', () => {
        key1 = hashMap.createKey(1);
        spy = chai.spy.on(hashMap, 'hasKey');
        hashMap.hasValue(1);

        expect(spy).to.have.been.called.once.with(key1);
      });

      it('should return true', () => {
        result = hashMap.hasValue(1);
        expect(result).to.be.true;
      });
    });

    describe('When the value does not exist', () => {
      before(() => {
        hashMap = new HashMap({values: [1, 2, 3]});
      });

      it('should return false', () => {
        expect(hashMap.hasValue(5)).to.be.false;
      });
    });

    describe('When using a custom keyGenerator', () => {
      before(() => {
        value1 = {id: 1, name: 'Chatroom 1', messages: ['hello', 'hi']};
        value2 = {id: 2, name: 'Chatroom 2', messages: ['apples', 'banananas']};
        value3 = {id: 1, name: 'Chatroom 1', messages: ['hello', 'hi', 'what\'s up']};

        hashMap = new HashMap({
          values: [value1],
          keyGenerator: (value) => (
            `${value.id} ${value.name}`
          )
        });
      });

      it('should return true if the custom keyGenerator key is matched', () => {
        expect(hashMap.hasValue(value1)).to.be.true;
        expect(hashMap.hasValue(value3)).to.be.true;
      });

      it('should return false if the custom keyGenerator key is not matched', () => {
        expect(hashMap.hasValue(value2)).to.be.false;
      });
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
});
