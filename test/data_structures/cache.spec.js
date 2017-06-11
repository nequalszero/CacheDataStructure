/* global describe, it, before, beforeEach */

import chai from 'chai';
import spies from 'chai-spies';
import Cache from '../../src/data_structures/cache';
import DoublyLinkedListNode from '../../src/data_structures/doubly_linked_list_node';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let cache, spy, errorFn, key, result, cb;

describe('Cache', () => {
  describe('When initializing a cache', () => {
    describe('without any values', () => {
      it('should have a length of 0', () => {
        cache = new Cache();
        expect(cache.length).to.be.equal(0);
      });
    });

    describe('with an array of values', () => {
      it('should have the correct length', () => {
        cache = new Cache({values: [1, 2, 3]});
        expect(cache.length).to.be.equal(3);
      });
    });

    describe('with a capacity', () => {
      it('should have a capacity equal to the given capacity', () => {
        cache = new Cache({capacity: 10});
        expect(cache.capacity).to.be.equal(10);
      });
    });

    describe('with no capacity', () => {
      it('should have a capacity equal to Infinity', () => {
        cache = new Cache();
        expect(cache.capacity).to.be.equal(Infinity);
      });
    });

    describe('with invalid params', () => {
      it('should throw a TypeError if params.values is not an Array', () => {
        errorFn = () => { cache = new Cache({values: {a: 5}}); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a TypeError if params.capacity is not an Integer', () => {
        errorFn = () => { cache = new Cache({capacity: {a: 5}}); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a RangeError if params.capacity is less than 1', () => {
        errorFn = () => { cache = new Cache({capacity: 0}); };
        expect(errorFn).to.throw(RangeError);
      });
    });
  });

  describe('.first', () => {
    it('should return the first item in the cache', () => {
      cache = new Cache({values: [1, 2, 3]});
      expect(cache.first.value).to.be.equal(1);
      expect(cache.first instanceof DoublyLinkedListNode).to.be.true;
    });
  });

  describe('.last', () => {
    it('should return the last item in the cache', () => {
      cache = new Cache({values: [1, 2, 3]});
      expect(cache.last.value).to.be.equal(3);
      expect(cache.last instanceof DoublyLinkedListNode).to.be.true;
    });
  });

  describe('#append', () => {
    describe('When there is infinite capacity', () => {
      before(() => {
        cache = new Cache();
        spy = chai.spy.on(cache, '_addValue');
        cache.append(1);
      });

      it('calls #_addValue(value, \'append\')', () => {
        expect(spy).to.have.been.called.once.with(1, 'append');
      });

      it('successfully appends a new value', () => {
        expect(cache.length).to.be.equal(1);
        expect(cache.hasValue(1)).to.be.true;
      });

      it('successfully appends another value', () => {
        cache.append(2);
        expect(cache.length).to.be.equal(2);
        expect(cache.hasValue(2)).to.be.true;
      });

      it('correctly modifies the _linkedList attribute', () => {
        cache.append(3);
        expect(cache._linkedList.first.value).to.be.equal(1);
        expect(cache._linkedList.last.value).to.be.equal(3);
      });
    });

    describe('When there is a capacity', () => {
      before(() => {
        cache = new Cache({values: [1, 2, 3], capacity: 3});
        spy = chai.spy.on(cache, '_eject');
        cache.append(4);
      });

      it('calls #_eject(\'append\')', () => {
        expect(spy).to.have.been.called.once.with('append');
      });

      it('successfully appends the new value', () => {
        expect(cache.hasValue(4)).to.be.true;
      });

      it('successfully removes the first value', () => {
        expect(cache.hasValue(1)).to.be.false;
      });

      it('has the correct length', () => {
        expect(cache.length).to.be.equal(3);
      });

      it('correctly modifies the _linkedList attribute', () => {
        expect(cache._linkedList.first.value).to.be.equal(2);
        expect(cache._linkedList.last.value).to.be.equal(4);
      });
    });
  });

  describe('#createKey', () => {
    before(() => {
      cache = new Cache();
      spy = chai.spy.on(cache._hashMap, 'createKey');
      key = cache.createKey(1);
    });

    it('should call the HashMap#createKey', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the value returned by HashMap#createKey', () => {
      expect(key).to.be.equal(cache._hashMap.createKey(1));
    });
  });

  describe('#forEach', () => {
    describe('When the length is 0', () => {
      beforeEach(() => {
        cache = new Cache();
        result = [];
        cb = (node) => result.push(node.value);
      });

      it('does nothing when the reversed boolean is left as false', () => {
        cache.forEach(cb);
        expect(result).to.be.empty;
      });

      it('does nothing when the reversed boolean is set to true', () => {
        cache.forEach(cb, true);
        expect(result).to.be.empty;
      });
    });

    describe('When the length is greater than 0', () => {
      beforeEach(() => {
        cache = new Cache({values: [1, 2, 3]});
        result = [];
        cb = (node) => result.push(node.value);
      });

      describe('when the reversed boolean is left as the default false', () => {
        it('executes the callback properly', () => {
          cache.forEach(cb);

          expect(result).to.include.ordered.members([1, 2, 3]);
          expect(result.length).to.be.equal(3);
        });

        it('calls DoublyLinkedList#forEach with the cb and a false boolean', () => {
          spy = chai.spy.on(cache._linkedList, 'forEach');
          cache.forEach(cb);
          expect(spy).to.have.been.called.once.with(cb, false);
        });

        it('executes the callback when the callback also takes an idx', () => {
          cb = (node, idx) => result.push(node.value * idx);
          cache.forEach(cb);

          expect(result).to.include.ordered.members([0, 2, 6]);
          expect(result.length).to.be.equal(3);
        });
      });

      describe('when the reversed boolean is set to true', () => {
        it('executes the callback when the reversed boolean is set to true', () => {
          cache.forEach(cb, true);

          expect(result).to.include.ordered.members([3, 2, 1]);
          expect(result.length).to.be.equal(3);
        });

        it('calls DoublyLinkedList#forEach with the cb and the reversed boolean set to true', () => {
          spy = chai.spy.on(cache._linkedList, 'forEach');
          cache.forEach(cb, true);
          expect(spy).to.have.been.called.once.with(cb, true);
        });

        it('executes the callback when the callback also takes an idx and the reversed boolean is true', () => {
          cb = (node, idx) => result.push(node.value * idx);
          cache.forEach(cb, true);

          expect(result).to.include.ordered.members([0, 2, 2]);
          expect(result.length).to.be.equal(3);
        });
      });
    });
  });

  describe('#hasValue', () => {
    before(() => {
      cache = new Cache({values: [1, 2, 3]});
    });

    it('should return false if the value is not in the cache', () => {
      expect(cache.hasValue(4)).to.be.false;
    });

    it('should return true if the value is in the cache', () => {
      expect(cache.hasValue(2)).to.be.true;
    });
  });

  describe('#map', () => {
    describe('When the length is 0', () => {
      beforeEach(() => {
        cache = new Cache();
        result = [];
        cb = (node) => result.push(node.value);
      });

      it('returns an empty array when the reversed boolean is left as the default false', () => {
        cache.map(cb);
        expect(result).to.be.empty;
      });

      it('returns an empty array when the reversed boolean is set to true', () => {
        cache.map(cb, true);
        expect(result).to.be.empty;
      });
    });

    describe('When the length is greater than 0', () => {
      beforeEach(() => {
        cache = new Cache({values: [1, 2, 3]});
        result = [];
        cb = (node) => result.push(node.value);
      });

      describe('when the reversed boolean is left as the default false', () => {
        it('executes the callback properly', () => {
          cache.map(cb);

          expect(result).to.include.ordered.members([1, 2, 3]);
          expect(result.length).to.be.equal(3);
        });

        it('calls DoublyLinkedList#map with the cb and a false boolean', () => {
          spy = chai.spy.on(cache._linkedList, 'map');
          cache.map(cb);
          expect(spy).to.have.been.called.once.with(cb, false);
        });

        it('executes the callback when the callback also takes an idx', () => {
          cb = (node, idx) => result.push(node.value * idx);
          cache.map(cb);

          expect(result).to.include.ordered.members([0, 2, 6]);
          expect(result.length).to.be.equal(3);
        });
      });

      describe('when the reversed boolean is set to true', () => {
        it('executes the callback when the reversed boolean is set to true', () => {
          cache.map(cb, true);

          expect(result).to.include.ordered.members([3, 2, 1]);
          expect(result.length).to.be.equal(3);
        });

        it('calls DoublyLinkedList#map with the cb and the reversed boolean set to true', () => {
          spy = chai.spy.on(cache._linkedList, 'map');
          cache.map(cb, true);
          expect(spy).to.have.been.called.once.with(cb, true);
        });

        it('executes the callback when the callback also takes an idx and the reversed boolean is true', () => {
          cb = (node, idx) => result.push(node.value * idx);
          cache.map(cb, true);

          expect(result).to.include.ordered.members([0, 2, 2]);
          expect(result.length).to.be.equal(3);
        });
      });
    });
  });

  describe('#prepend', () => {
    describe('When there is infinite capacity', () => {
      before(() => {
        cache = new Cache();
        spy = chai.spy.on(cache, '_addValue');
        cache.prepend(1);
      });

      it('calls #_addValue(value, \'prepend\')', () => {
        expect(spy).to.have.been.called.once.with(1, 'prepend');
      });

      it('successfully prepends a new value', () => {
        expect(cache.length).to.be.equal(1);
        expect(cache.hasValue(1)).to.be.true;
      });

      it('successfully prepends another value', () => {
        cache.prepend(2);
        expect(cache.length).to.be.equal(2);
        expect(cache.hasValue(2)).to.be.true;
      });

      it('correctly modifies the _linkedList attribute', () => {
        cache.prepend(3);
        expect(cache._linkedList.first.value).to.be.equal(3);
        expect(cache._linkedList.last.value).to.be.equal(1);
      });
    });

    describe('When there is a capacity', () => {
      before(() => {
        cache = new Cache({values: [2, 3, 4], capacity: 3});
        spy = chai.spy.on(cache, '_eject');
        cache.prepend(1);
      });

      it('calls #_eject(\'prepend\')', () => {
        expect(spy).to.have.been.called.once.with('prepend');
      });

      it('successfully prepends the new value', () => {
        expect(cache.hasValue(1)).to.be.true;
      });

      it('successfully removes the last value', () => {
        expect(cache.hasValue(4)).to.be.false;
      });

      it('has the correct length', () => {
        expect(cache.length).to.be.equal(3);
      });

      it('correctly modifies the _linkedList attribute', () => {
        expect(cache._linkedList.first.value).to.be.equal(1);
        expect(cache._linkedList.last.value).to.be.equal(3);
      });
    });
  });
});
