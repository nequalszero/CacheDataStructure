/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';
import Cache from '../../src/data_structures/cache';
import DoublyLinkedListNode from '../../src/data_structures/doubly_linked_list_node';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let cache, spy, errorFn;

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
