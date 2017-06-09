/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';

import DoublyLinkedListNode from '../../src/data_structures/doubly_linked_list_node';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let linkedListNode, nullNode, spy;

describe('DoublyLinkedListNode', () => {
  describe('When initializing a doubly linked list node', () => {
    describe('with a value', () => {
      before(() => {
        linkedListNode = new DoublyLinkedListNode(5);
      });

      it('should return the value attribue', () => {
        expect(linkedListNode.value).to.be.equal(5);
      });

      it('should return null for the prev attribute', () => {
        expect(linkedListNode.prev).to.be.equal(null);
      });

      it('should return null for the next attribute', () => {
        expect(linkedListNode.next).to.be.equal(null);
      });
    });

    describe('without a value', () => {
      before(() => {
        nullNode = new DoublyLinkedListNode();
      });

      it('should return null', () => {
        expect(nullNode.value).to.be.equal(null);
      });

      it('should return null for the prev attribute', () => {
        expect(nullNode.prev).to.be.equal(null);
      });

      it('should return null for the next attribute', () => {
        expect(nullNode.next).to.be.equal(null);
      });
    });
  });

  let node1, node2, node3;

  describe('When setting the prev attribute', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      node2 = new DoublyLinkedListNode(2);
      node3 = new DoublyLinkedListNode(3);

      node2.prev = node1;
      node3.prev = node2;
    });

    it('should return node1 for node2.prev', () => {
      expect(node2.prev).to.be.equal(node1);
    });

    it('should return node2 for node3.prev', () => {
      expect(node3.prev).to.be.equal(node2);
    });
  });

  describe('When setting the next attribute', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      node2 = new DoublyLinkedListNode(2);
      node3 = new DoublyLinkedListNode(3);

      node1.next = node2;
      node2.next = node3;
    });

    it('should return node2 for node1.next', () => {
      expect(node1.next).to.be.equal(node2);
    });

    it('should return node3 for node2.next', () => {
      expect(node2.next).to.be.equal(node3);
    });
  });

  describe('#toString', () => {
    before(() => {
      node1 = new DoublyLinkedListNode(1);
      node2 = new DoublyLinkedListNode(2);
      node3 = new DoublyLinkedListNode(3);

      node1.next = node2;
      node2.next = node3;
    });

    it('should return the result of calling #toString on the value attribute', () => {
      node1 = new DoublyLinkedListNode({a: 5});

      expect(node1.toString()).to.be.equal({a: 5}.toString());
    });
  });
});
