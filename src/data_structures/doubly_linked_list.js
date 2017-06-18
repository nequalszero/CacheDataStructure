import DoublyLinkedListNode from './doubly_linked_list_node';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

// Accepts an optional array of starting values.
export default class DoublyLinkedList {
  constructor(params = null) {
    this._validateInput(params);
    params = Object.assign(
      { values: null, comparisonCb: (a, b) => (a.value === b.value) },
      params
    );

    this._head = new DoublyLinkedListNode();
    this._tail = new DoublyLinkedListNode();
    this._tail.prev = this._head;
    this._head.next = this._tail;
    this._length = 0;
    this._comparisonCb = params.comparisonCb;

    if (params.values) this._addInitialValues(params.values);
  }

  get comparisonCb() {
    return this._comparisonCb;
  }

  get first() {
    if (this._length === 0) return null;
    return this._head.next;
  }

  get last() {
    if (this._length === 0) return null;
    return this._tail.prev;
  }

  get length() {
    return this._length;
  }

  set comparisonCb(cb) {
    if (!(typeof cb === 'function')) throw new TypeError('given cb is not a function');
    this._comparisonCb = cb;
  }

  // Adds a value to the rear of the cache.
  append(value) {
    const node = value instanceof DoublyLinkedListNode ? value : new DoublyLinkedListNode(value);
    const oldLast = this._tail.prev;

    oldLast.next = node;
    node.prev = oldLast;
    node.next = this._tail;
    this._tail.prev = node;
    this._length += 1;

    return node;
  }

  forEach(cb, reversed = false) {
    // options object will have startingNode, stoppingNode, and nextKey attributes
    const options = this._loopConditions(reversed);
    let currentNode = options.startingNode[options.nextKey];
    let idx = 0;

    while (currentNode !== options.stoppingNode) {
      cb(currentNode, idx);
      currentNode = currentNode[options.nextKey];
      idx += 1;
    }
  }

  includes(value) {
    if (this._length === 0) return false;

    let found = false;
    const comparisonNode = value instanceof DoublyLinkedListNode ? value : new DoublyLinkedListNode(value);

    this.forEach((node) => { if (this._comparisonCb(node, comparisonNode)) found = true; });
    return found;
  }

  map(cb, reversed = false) {
    const result = [];
    const mapCb = (node, idx) => result.push(cb(node, idx));

    this.forEach(mapCb, reversed);

    return result;
  }

  // Removes a node from the back of the cache.
  pop() {
    if (this.length === 0) return null;
    const lastNode = this.last;

    this._tail.prev = lastNode.prev;
    lastNode.prev.next = this._tail;
    lastNode.prev = null;
    lastNode.next = null;
    this._length -= 1;

    return lastNode;
  }

  // Adds a value to the front of the cache.
  prepend(value) {
    const node = value instanceof DoublyLinkedListNode ? value : new DoublyLinkedListNode(value);
    const oldFirst = this._head.next;

    oldFirst.prev = node;
    node.next = oldFirst;
    node.prev = this._head;
    this._head.next = node;
    this._length += 1;

    return node;
  }

  // Removes a node from the cache.
  remove(node) {
    node.next.prev = node.prev;
    node.prev.next = node.next;
    node.next = null;
    node.prev = null;
    this._length -= 1;

    return node;
  }

  // Removes a node from the front of the cache.
  shift() {
    if (this.length === 0) return null;
    const firstNode = this.first;

    this._head.next = firstNode.next;
    firstNode.next.prev = this._head;
    firstNode.prev = null;
    firstNode.next = null;
    this._length -= 1;

    return firstNode;
  }

  // Method aliases
  add(value) {
    return this.append(value);
  }

  delete(node) {
    return this.remove(node);
  }

  push(value) {
    return this.append(value);
  }

  unshift(value) {
    return this.prepend(value);
  }

  // Private methods

  // Adds values one after another to the back of the cache.
  _addInitialValues(values) {
    values.forEach((value) => {
      this.append(value);
    });
  }

  _loopConditions(reverseOrder) {
    return {
      startingNode: reverseOrder ? this._tail : this._head,
      stoppingNode: reverseOrder ? this._head : this._tail,
      nextKey: reverseOrder ? '_prev' : '_next'
    };
  }

  _validateInput(params) {
    if (!(isPlainObject(params) || params === null)) {
      throw new TypeError('params should be an object or null.');
    } else if (params) {
      const {values, comparisonCb} = params;
      const valuesError = new TypeError('values should be an array or null.');
      const comparisonCbError = new TypeError('comparisonCb should be a Function or null.');

      if (!(isArray(values) || values === undefined)) throw valuesError;
      if (!(typeof comparisonCb === 'function' || comparisonCb === undefined)) throw comparisonCbError;
    }
  }
}
