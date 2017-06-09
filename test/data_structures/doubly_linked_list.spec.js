/* global describe, it, before */

import chai from 'chai';
import spies from 'chai-spies';
import DoublyLinkedList from '../../src/data_structures/doubly_linked_list';
import DoublyLinkedListNode from '../../src/data_structures/doubly_linked_list_node';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let linkedList, firstNode, lastNode, spy;
let node1, node2, node3, removedNode;

describe('DoublyLinkedList', () => {
  describe('When initializing a doubly linked list', () => {
    describe('without any values', () => {
      it('should have a length of 0', () => {
        linkedList = new DoublyLinkedList();
        expect(linkedList.length).to.be.equal(0);
      });
    });

    describe('with an array of values', () => {
      it('should have the correct length', () => {
        linkedList = new DoublyLinkedList([1, 2, 3]);
        expect(linkedList.length).to.be.equal(3);
      });
    });

    describe('with an array of linked list nodes', () => {
      it('should have the correct length', () => {
        node1 = new DoublyLinkedListNode(1);
        node2 = new DoublyLinkedListNode(2);
        node3 = new DoublyLinkedListNode(3);
        linkedList = new DoublyLinkedList([node1, node2, node3]);
        expect(linkedList.length).to.be.equal(3);
      });
    });
  });

  describe('When accessing the first element', () => {
    it('returns null when the list is empty', () => {
      linkedList = new DoublyLinkedList();
      firstNode = linkedList.first;

      expect(firstNode).to.be.equal(null);
    });

    it('returns the first node when the list has elements', () => {
      linkedList = new DoublyLinkedList([1, 2, 3]);
      firstNode = linkedList.first;

      expect(firstNode.value).to.be.eq(1);
    });
  });

  describe('When accessing the last element', () => {
    it('returns null when the list is empty', () => {
      linkedList = new DoublyLinkedList();
      lastNode = linkedList.last;

      expect(lastNode).to.be.equal(null);
    });

    it('returns the last node when the list has elements', () => {
      linkedList = new DoublyLinkedList([1, 2, 3]);
      lastNode = linkedList.last;

      expect(lastNode.value).to.be.eq(3);
    });
  });

  describe('When using #append to add new values and linked list nodes', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      node1 = linkedList.append(1);
      node2 = linkedList.append(new DoublyLinkedListNode(2));
    });

    it('should properly append a new value or linked list node', () => {
      expect(linkedList.first.value).to.be.eq(1);
    });

    it('should properly append a second value or linked list node', () => {
      expect(linkedList.last.value).to.be.eq(2);
    });

    it('should properly increase the length attribute', () => {
      expect(linkedList.length).to.be.eq(2);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
      expect(node2 instanceof DoublyLinkedListNode).to.be.true;
      expect(node2.value).to.be.equal(2);
    });
  });

  describe('When using #prepend to add new values and linked list nodes', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      node1 = linkedList.prepend(1);
      node2 = linkedList.prepend(new DoublyLinkedListNode(2));
    });

    it('should properly prepend a new value or linked list node', () => {
      expect(linkedList.first.value).to.be.eq(2);
    });

    it('should properly prepend a second value or linked list node', () => {
      expect(linkedList.last.value).to.be.eq(1);
    });

    it('should properly increase the length attribute', () => {
      expect(linkedList.length).to.be.eq(2);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
      expect(node2 instanceof DoublyLinkedListNode).to.be.true;
      expect(node2.value).to.be.equal(2);
    });
  });

  describe('When using the #add method', () => {
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

  describe('When using the #push method', () => {
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

  describe('When using the #unshift method', () => {
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

  describe('When using #pop to remove nodes', () => {
    it('should return null when the list length is 0', () => {
      linkedList = new DoublyLinkedList();
      expect(linkedList.pop()).to.be.equal(null);
    });

    describe('When the list lenth is greater than 0', () => {
      before(() => {
        linkedList = new DoublyLinkedList([1, 2, 3]);
        node3 = linkedList.pop();
        node2 = linkedList.pop();
      });

      it('returns the correct node', () => {
        expect(node3.value).to.be.equal(3);
        expect(node2.value).to.be.equal(2);
      });

      it('sets the returned node\'s next and prev attributes to null', () => {
        expect(node3.prev).to.be.equal(null);
        expect(node3.next).to.be.equal(null);
        expect(node2.prev).to.be.equal(null);
        expect(node2.next).to.be.equal(null);
      });

      it('should properly decrease the length attribute', () => {
        expect(linkedList.length).to.be.eq(1);
      });
    });
  });

  describe('When using #shift to remove nodes', () => {
    it('should return null when the list length is 0', () => {
      linkedList = new DoublyLinkedList();
      expect(linkedList.shift()).to.be.equal(null);
    });

    describe('When the list lenth is greater than 0', () => {
      before(() => {
        linkedList = new DoublyLinkedList([1, 2, 3]);
        node1 = linkedList.shift();
        node2 = linkedList.shift();
      });

      it('returns the correct node', () => {
        expect(node1.value).to.be.equal(1);
        expect(node2.value).to.be.equal(2);
      });

      it('sets the returned node\'s next and prev attributes to null', () => {
        expect(node1.prev).to.be.equal(null);
        expect(node1.next).to.be.equal(null);
        expect(node2.prev).to.be.equal(null);
        expect(node2.next).to.be.equal(null);
      });

      it('should properly decrease the length attribute', () => {
        expect(linkedList.length).to.be.eq(1);
      });
    });
  });

  describe('When using the #delete method', () => {
    before(() => {
      node2 = new DoublyLinkedListNode(2);
      linkedList = new DoublyLinkedList([1, node2, 3]);
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
});
