/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';
import Cache from '../../src/data_structures/cache';
import DoublyLinkedListNode from '../../src/data_structures/doubly_linked_list_node';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let cache, result;
let spy;
let node1, node2, node3;

describe('Cache method aliases', () => {
  describe('#add', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);

      cache = new Cache({values: [2, 3]});
      spy = chai.spy.on(cache, 'prepend');
      result = cache.add(node1);
    });

    it('should call Cache#prepend with the given value', () => {
      expect(spy).to.have.been.called.once.with(node1);
    });

    it('should return the result of calling Cache#prepend', () => {
      expect(result).to.be.equal(node1);
    });
  });

  describe('#contains', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      node2 = new DoublyLinkedListNode(2);
      node3 = new DoublyLinkedListNode(3);

      cache = new Cache({values: [node1, node2, node3]});
      spy = chai.spy.on(cache, 'hasValue');
      result = cache.contains(node1);
    });

    it('should call Cache#hasValue with the given value', () => {
      expect(spy).to.have.been.called.once.with(node1);
    });

    it('should return the result of calling Cache#contains', () => {
      expect(result).to.be.equal(cache.hasValue(node1));
    });
  });

  describe('#delete', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      node2 = new DoublyLinkedListNode(2);
      node3 = new DoublyLinkedListNode(3);

      cache = new Cache({values: [node1, node2, node3]});
      spy = chai.spy.on(cache, 'remove');
      result = cache.delete(node1);
    });

    it('should call the Cache#remove', () => {
      expect(spy).to.have.been.called.with(node1);
    });

    it('should return the result of calling Cache#remove', () => {
      expect(result).to.be.equal(node1);
    });
  });

  describe('#has', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      node2 = new DoublyLinkedListNode(2);
      node3 = new DoublyLinkedListNode(3);

      cache = new Cache({values: [node1, node2, node3]});
      spy = chai.spy.on(cache, 'hasValue');
      result = cache.has(node1);
    });

    it('should call Cache#hasValue with the given value', () => {
      expect(spy).to.have.been.called.once.with(node1);
    });

    it('should return the result of calling Cache#contains', () => {
      expect(result).to.be.equal(cache.hasValue(node1));
    });
  });

  describe('#include', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      node2 = new DoublyLinkedListNode(2);
      node3 = new DoublyLinkedListNode(3);

      cache = new Cache({values: [node1, node2, node3]});
      spy = chai.spy.on(cache, 'hasValue');
      result = cache.include(node1);
    });

    it('should call Cache#hasValue with the given value', () => {
      expect(spy).to.have.been.called.once.with(node1);
    });

    it('should return the result of calling Cache#contains', () => {
      expect(result).to.be.equal(cache.hasValue(node1));
    });
  });

  describe('#includes', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      node2 = new DoublyLinkedListNode(2);
      node3 = new DoublyLinkedListNode(3);

      cache = new Cache({values: [node1, node2, node3]});
      spy = chai.spy.on(cache, 'hasValue');
      result = cache.includes(node1);
    });

    it('should call Cache#hasValue with the given value', () => {
      expect(spy).to.have.been.called.once.with(node1);
    });

    it('should return the result of calling Cache#contains', () => {
      expect(result).to.be.equal(cache.hasValue(node1));
    });
  });

  describe('#push', () => {
    before(() => {
      node3 = new DoublyLinkedListNode(3);

      cache = new Cache({values: [1, 2]});
      spy = chai.spy.on(cache, 'append');
      result = cache.push(node3);
    });

    it('should call Cache#append with the given value', () => {
      expect(spy).to.have.been.called.once.with(node3);
    });

    it('should return the result of calling Cache#append', () => {
      expect(result).to.be.equal(node3);
    });
  });

  describe('#unshift', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);

      cache = new Cache({values: [2, 3]});
      spy = chai.spy.on(cache, 'prepend');
      result = cache.unshift(node1);
    });

    it('should call Cache#prepend with the given value', () => {
      expect(spy).to.have.been.called.once.with(node1);
    });

    it('should return the result of calling Cache#prepend', () => {
      expect(result).to.be.equal(node1);
    });
  });
});
