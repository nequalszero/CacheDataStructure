/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';
import DoublyLinkedList from '../../src/data_structures/doubly_linked_list';
import DoublyLinkedListNode from '../../src/data_structures/doubly_linked_list_node';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let linkedList, firstNode, lastNode, spy, errorFn;
let node1, node2, node3, removedNode, result, cb;

describe('DoublyLinkedList', () => {
  describe('#add', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      spy = chai.spy.on(linkedList, 'append');
      node1 = linkedList.add(1);
    });

    it('should call #append with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
    });
  });

  describe('#delete', () => {
    before(() => {
      node2 = new DoublyLinkedListNode(2);
      linkedList = new DoublyLinkedList({values: [1, node2, 3]});
      spy = chai.spy.on(linkedList, 'remove');
      removedNode = linkedList.delete(node2);
    });

    it('should call #remove with the given node', () => {
      expect(spy).to.have.been.called.once.with(node2);
    });

    it('should return the deleted node', () => {
      expect(removedNode instanceof DoublyLinkedListNode).to.be.true;
      expect(removedNode.value).to.be.equal(2);
    });
  });

  describe('#push', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      spy = chai.spy.on(linkedList, 'append');
      node1 = linkedList.push(1);
    });

    it('should call #append with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
    });
  });

  describe('#unshift', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      spy = chai.spy.on(linkedList, 'prepend');
      node1 = linkedList.unshift(1);
    });

    it('should call #prepend with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
    });
  });
});
