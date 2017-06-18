/* global describe, it, before, beforeEach */

import chai from 'chai';
import spies from 'chai-spies';
import Cache from '../../src/data_structures/cache';
import DoublyLinkedListNode from '../../src/data_structures/doubly_linked_list_node';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let cache, defaultCache, errorFn, key, result, cb;
let spy, spy1, spy2, spy3;
let node1, node2, node3, node4, node5;
let value1, value2, value3;
let length1, length2;

describe('Cache', () => {
  describe('When initializing a cache', () => {
    describe('with valid params', () => {
      describe('without any values', () => {
        it('should have a length of 0', () => {
          cache = new Cache();
          expect(cache.length).to.be.equal(0);
        });
      });

      describe('with an array of values', () => {
        before(() => {
          cache = new Cache({values: [1, 2, 3]});
        });

        it('should have the correct cache, _hashMap, and _linkedList lengths', () => {
          expect(cache.length).to.be.equal(3);
          expect(cache._hashMap.length).to.be.equal(3);
          expect(cache._linkedList.length).to.be.equal(3);
        });

        it('should properly update the _hashMap with doubly linked list nodes', () => {
          cache._hashMap.values.forEach((val) => {
            expect(val instanceof DoublyLinkedListNode).to.be.true;
          });
        });
      });

      describe('with an array of doubly linked list nodes', () => {
        before(() => {
          node1 = new DoublyLinkedListNode(1);
          node2 = new DoublyLinkedListNode(2);
          node3 = new DoublyLinkedListNode(3);

          cache = new Cache({values: [node1, node2, node3]});
        });

        it('should have the correct cache, _hashMap, and _linkedList lengths', () => {
          expect(cache.length).to.be.equal(3);
          expect(cache._hashMap.length).to.be.equal(3);
          expect(cache._linkedList.length).to.be.equal(3);
        });

        it('should properly update the _hashMap with DoublyLinkedListNode instances', () => {
          cache._hashMap.values.forEach((val) => {
            expect(val instanceof DoublyLinkedListNode).to.be.true;
          });
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

      describe('without a keyGenerator', () => {
        it('should use the default keyGenerator', () => {
          cache = new Cache();
          expect(typeof cache.keyGenerator).to.be.equal('function');
        });
      });

      describe('with a keyGenerator', () => {
        it('should use the provided keyGenerator', () => {
          cache = new Cache({ keyGenerator: (a) => (a.id) });
          defaultCache = new Cache();

          expect(cache.keyGenerator({id: 2})).not.to.be.equal(defaultCache.keyGenerator({id: 2}));
        });
      });
    });

    describe('with invalid params', () => {
      it('should throw a TypeError if params is not an Object', () => {
        errorFn = () => { cache = new Cache([1, 2, 3]); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a TypeError if params is equal to null', () => {
        errorFn = () => { cache = new Cache(null); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a TypeError if params.values is not an Array', () => {
        errorFn = () => { cache = new Cache({ values: {a: 5} }); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a TypeError if params.values is equal to null', () => {
        errorFn = () => { cache = new Cache({ values: null }); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a TypeError if params.capacity is not an Integer', () => {
        errorFn = () => { cache = new Cache({ capacity: {a: 5} }); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a TypeError if params.capacity is equal to null', () => {
        errorFn = () => { cache = new Cache({ capacity: null }); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a RangeError if params.capacity is less than 1', () => {
        errorFn = () => { cache = new Cache({ capacity: 0 }); };
        expect(errorFn).to.throw(RangeError);
      });

      it('should throw a TypeError if params.keyGenerator is not a function', () => {
        errorFn = () => { cache = new Cache({ keyGenerator: 0 }); };
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a TypeError if params.keyGenerator is equal to null', () => {
        errorFn = () => { cache = new Cache({ keyGenerator: null }); };
        expect(errorFn).to.throw(TypeError);
      });
    });
  });

  describe('Getter methods', () => {
    describe('.capacity', () => {
      it('should return the capacity of the cache', () => {
        cache = new Cache();
        expect(cache.capacity).to.be.equal(Infinity);

        cache = new Cache({ capacity: 5 });
        expect(cache.capacity).to.be.equal(5);
      });
    });

    describe('.first', () => {
      it('should return the first item in the cache', () => {
        cache = new Cache({ values: [1, 2, 3] });
        expect(cache.first.value).to.be.equal(1);
        expect(cache.first instanceof DoublyLinkedListNode).to.be.true;
      });
    });

    describe('.last', () => {
      it('should return the last item in the cache', () => {
        cache = new Cache({ values: [1, 2, 3] });
        expect(cache.last.value).to.be.equal(3);
        expect(cache.last instanceof DoublyLinkedListNode).to.be.true;
      });
    });

    describe('.length', () => {
      it('should return the length of the cache', () => {
        cache = new Cache({ values: [1, 2, 3] });
        expect(cache.length).to.be.equal(3);
      });
    });

    describe('.keyGenerator', () => {
      it('should return the keyGenerator of the cache', () => {
        cache = new Cache({ keyGenerator: (a) => (a.id) });
        expect(typeof cache.keyGenerator === 'function').to.be.true;
      });
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
        expect(cache.first.value).to.be.equal(1);
        expect(cache.last.value).to.be.equal(3);
      });

      it('handles new additions that are nodes', () => {
        node4 = new DoublyLinkedListNode(4);
        cache.append(node4);

        expect(cache.last).to.be.equal(node4);
      });

      it('adds doubly linked list nodes to the hash map', () => {
        cache._hashMap.values.forEach((val) => {
          expect(val instanceof DoublyLinkedListNode).to.be.true;
        });
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
        it('executes the callback', () => {
          cache.forEach(cb, true);

          expect(result).to.include.ordered.members([3, 2, 1]);
          expect(result.length).to.be.equal(3);
        });

        it('calls DoublyLinkedList#forEach with the cb', () => {
          spy = chai.spy.on(cache._linkedList, 'forEach');
          cache.forEach(cb, true);
          expect(spy).to.have.been.called.once.with(cb, true);
        });

        it('executes the callback when the callback also takes an idx', () => {
          cb = (node, idx) => result.push(node.value * idx);
          cache.forEach(cb, true);

          expect(result).to.include.ordered.members([0, 2, 2]);
          expect(result.length).to.be.equal(3);
        });
      });
    });
  });

  describe('#getNode', () => {
    describe('When using the default keyGenerator function', () => {
      before(() => {
        node1 = new DoublyLinkedListNode(1);
        node3 = new DoublyLinkedListNode(3);

        cache = new Cache({values: [node1, 2, node3]});
      });

      it('should return the correct node', () => {
        result = cache.getNode(1);
        expect(result).to.be.equal(node1);

        result = cache.getNode(2);
        expect(result.value).to.be.equal(2);
      });

      it('should call #createKey with the value passed in', () => {
        spy = chai.spy.on(cache, 'createKey');
        cache.getNode(3);

        expect(spy).to.have.been.called.once.with(3);
      });

      it('should return null if the node is not found', () => {
        result = cache.getNode(5);

        expect(result).to.be.equal(null);
      });
    });

    describe('When using a custom keyGenerator function', () => {
      before(() => {
        node1 = new DoublyLinkedListNode({ id: 1, firstName: 'Alfred', lastName: 'Atkins' });
        node2 = new DoublyLinkedListNode({ id: 2, firstName: 'Bob', lastName: 'Burgers' });
        value1 = { firstName: 'Alfred', lastName: 'Atkins' };

        cache = new Cache({
          values: [node1, node2],
          keyGenerator: (value) => (`${value.firstName} ${value.lastName}`)
        });

        console.log('hashMap keys: ', cache._hashMap.keys);
        console.log('keyGenerator: ', cache._hashMap.keyGenerator);
      });

      it('should return the correct node', () => {
        result = cache.getNode(value1);
        expect(result).to.be.equal(node1);
      });

      it('should call #createKey with the value passed in', () => {
        spy = chai.spy.on(cache, 'createKey');
        cache.getNode(value1);

        expect(spy).to.have.been.called.once.with(value1);
      });

      it('should return null if the node is not found', () => {
        result = cache.getNode(5);

        expect(result).to.be.equal(null);
      });
    });
  });

  describe('#hasValue', () => {
    describe('When using the default keyGenerator function', () => {
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

    describe('When using a custom keyGenerator function', () => {
      before(() => {
        value1 = { id: 1, firstName: 'Alfred', lastName: 'Atkins' };
        value2 = { id: 2, firstName: 'Bob', lastName: 'Burgers' };
        value3 = { firstName: 'Alfred', lastName: 'Atkins' };

        cache = new Cache({
          values: [value1, value2],
          keyGenerator: (value) => (`${value.firstName} ${value.lastName}`)
        });
      });

      it('should return true if the keyGenerator key matches', () => {
        expect(cache.hasValue(value3)).to.be.true;
      });
    });
  });

  describe('#map', () => {
    describe('When the length is 0', () => {
      beforeEach(() => {
        cache = new Cache();
        result = [];
        cb = (node) => result.push(node.value);
      });

      it('returns an empty array when the reversed boolean is left as false', () => {
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
        it('executes the callback', () => {
          cache.map(cb, true);

          expect(result).to.include.ordered.members([3, 2, 1]);
          expect(result.length).to.be.equal(3);
        });

        it('calls DoublyLinkedList#map with the cb', () => {
          spy = chai.spy.on(cache._linkedList, 'map');
          cache.map(cb, true);
          expect(spy).to.have.been.called.once.with(cb, true);
        });

        it('executes the callback when the callback also takes an idx', () => {
          cb = (node, idx) => result.push(node.value * idx);
          cache.map(cb, true);

          expect(result).to.include.ordered.members([0, 2, 2]);
          expect(result.length).to.be.equal(3);
        });
      });
    });
  });

  describe('#moveToBack', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      cache = new Cache({values: [node1, 2, 3]});
    });

    describe('When the node does not exist', () => {
      it('should throw an error', () => {
        errorFn = () => { cache.moveToBack(4); };
        expect(errorFn).to.throw(Error);
      });
    });

    describe('When the node does exist', () => {
      it('should move the node to the back', () => {
        cache.moveToBack(1);
        expect(cache.last).to.be.equal(node1);
      });
    });
  });

  describe('#moveToFront', () => {
    before(() => {
      node3 = new DoublyLinkedListNode(3);
      cache = new Cache({values: [1, 2, node3]});
    });

    describe('When the node does not exist', () => {
      it('should throw an error', () => {
        errorFn = () => { cache.moveToFront(4); };
        expect(errorFn).to.throw(Error);
      });
    });

    describe('When the node does exist', () => {
      it('should move the node to the front', () => {
        cache.moveToFront(3);
        expect(cache.first).to.be.equal(node3);
      });
    });
  });

  describe('#pop', () => {
    describe('When there are no values in the cache', () => {
      before(() => {
        cache = new Cache();
        spy = chai.spy.on(cache, 'remove');

        result = cache.pop();
      });

      it('should return null', () => {
        expect(result).to.be.null;
      });

      it('should not call #remove', () => {
        expect(spy).not.to.have.been.called;
      });

      it('should not modify the length', () => {
        expect(cache.length).to.be.equal(0);
      });
    });

    describe('When there are values in the cache', () => {
      before(() => {
        node3 = new DoublyLinkedListNode(3);
        cache = new Cache({values: [1, 2, node3]});
        spy = chai.spy.on(cache, 'remove');

        result = cache.pop();
      });

      it('should return the last element in the cache', () => {
        expect(result).to.be.equal(node3);
      });

      it('should call #remove with this._linkedList.last', () => {
        expect(spy).to.have.been.called.once.with(node3);
      });

      it('should modify the length', () => {
        expect(cache.length).to.be.equal(2);
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

      it('handles new prepends that are nodes', () => {
        node4 = new DoublyLinkedListNode(4);
        cache.prepend(node4);

        expect(cache.first).to.be.equal(node4);
      });

      it('adds doubly linked list nodes to the hash map', () => {
        cache._hashMap.values.forEach((val) => {
          expect(val instanceof DoublyLinkedListNode).to.be.true;
        });
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

  describe('#remove', () => {
    describe('When the value does not exist in the cache', () => {
      before(() => {
        node1 = new DoublyLinkedListNode(1);
        node2 = new DoublyLinkedListNode(2);
        node3 = new DoublyLinkedListNode(3);
        node4 = new DoublyLinkedListNode(4);
        node5 = new DoublyLinkedListNode(5);

        cache = new Cache({values: [node1, node2, node3, node4]});

        spy1 = chai.spy.on(cache._hashMap, 'getValue');
        spy2 = chai.spy.on(cache._hashMap, 'remove');
        spy3 = chai.spy.on(cache._linkedList, 'remove');
        key = cache._hashMap.createKey(node5);

        length1 = cache.length;
        result = cache.remove(node5);
        length2 = cache.length;
      });

      it('should check if the value exists in the cache', () => {
        expect(spy1).to.have.been.called.once.with(key);
      });

      it('should not call HashMap#remove', () => {
        expect(spy2).not.to.have.been.called;
      });

      it('should not call DoublyLinkedList#remove', () => {
        expect(spy3).not.to.have.been.called;
      });

      it('should return null', () => {
        expect(result).to.be.null;
      });

      it('should not modify the length', () => {
        expect(length1).to.be.equal(length2);
      });
    });

    describe('When the value exists in the cache', () => {
      before(() => {
        node1 = new DoublyLinkedListNode(1);
        node2 = new DoublyLinkedListNode(2);
        node3 = new DoublyLinkedListNode(3);
        node4 = new DoublyLinkedListNode(4);
        node5 = new DoublyLinkedListNode(5);

        cache = new Cache({values: [node1, node2, node3, node4]});

        spy1 = chai.spy.on(cache._hashMap, 'getValue');
        spy2 = chai.spy.on(cache._hashMap, 'remove');
        spy3 = chai.spy.on(cache._linkedList, 'remove');
        key = cache._hashMap.createKey(node3);

        length1 = cache.length;
        result = cache.remove(node3);
        length2 = cache.length;
      });

      it('should check if the value exists in the cache', () => {
        expect(spy1).to.have.been.called.once.with(key);
      });

      it('should call HashMap#remove', () => {
        expect(spy2).to.have.been.called.once.with(node3);
      });

      it('should call DoublyLinkedList#remove', () => {
        expect(spy3).to.have.been.called.once.with(node3);
      });

      it('should return the removed node', () => {
        expect(result).to.be.equal(node3);
      });

      it('should decrease the length by 1', () => {
        expect(length1).to.be.equal(length2 + 1);
      });
    });
  });

  describe('#shift', () => {
    describe('When there are no values in the cache', () => {
      before(() => {
        cache = new Cache();
        spy = chai.spy.on(cache, 'remove');

        result = cache.shift();
      });

      it('should return null', () => {
        expect(result).to.be.null;
      });

      it('should not call #remove', () => {
        expect(spy).not.to.have.been.called;
      });

      it('should not modify the length', () => {
        expect(cache.length).to.be.equal(0);
      });
    });

    describe('When there are values in the cache', () => {
      before(() => {
        node1 = new DoublyLinkedListNode(1);
        cache = new Cache({values: [node1, 2, 3]});
        spy = chai.spy.on(cache, 'remove');

        result = cache.shift();
      });

      it('should return the last element in the cache', () => {
        expect(result).to.be.equal(node1);
      });

      it('should call #remove with this._linkedList.last', () => {
        expect(spy).to.have.been.called.once.with(node1);
      });

      it('should modify the length', () => {
        expect(cache.length).to.be.equal(2);
      });
    });
  });
});
