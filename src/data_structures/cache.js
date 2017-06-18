import DoublyLinkedList from './doubly_linked_list';
import DoublyLinkedListNode from './doubly_linked_list_node';
import HashMap from './hash_map';
import isArray from 'lodash/isArray';
import isInteger from 'lodash/isInteger';
import isPlainObject from 'lodash/isPlainObject';

// Accepts a params Object with keys:
//   values: array of starting values, and
//   capacity: integer for maximum length, default is Infinity
export default class Cache {
  constructor(options = {}) {
    this._validateInput(options);
    const params = Object.assign({ capacity: Infinity, values: null }, options);

    // Applies the custom keyGenerator function if provided, after extracting the value
    //   attribute in the case of value being a DoublyLinkedListNode instance.
    params.keyGenerator = ((value) => {
      if (value instanceof DoublyLinkedListNode) value = value.value;

      return (options.keyGenerator !== undefined) ? options.keyGenerator(value) : value;
    });

    this._hashMap = new HashMap({ keyGenerator: params.keyGenerator });
    this._linkedList = new DoublyLinkedList();
    this._capacity = params.capacity;

    if (params.values) this._addStartingValues(params.values);
  }

  get capacity() {
    return this._capacity;
  }

  get first() {
    if (this._linkedList.length === 0) return null;
    return this._linkedList.first;
  }

  get keyGenerator() {
    return this._hashMap.keyGenerator;
  }

  get last() {
    if (this._linkedList.length === 0) return null;
    return this._linkedList.last;
  }

  get length() {
    return this._linkedList.length;
  }

  append(value) {
    return this._addValue(value, 'append');
  }

  createKey(value) {
    return this._hashMap.createKey(value);
  }

  forEach(cb, reversed = false) {
    if (this._linkedList.length === 0) return;
    this._linkedList.forEach(cb, reversed);
  }

  getNode(value) {
    const key = this.createKey(value);

    return this._hashMap.getValue(key);
  }

  hasValue(value) {
    const key = this.createKey(value);

    return this._hashMap.hasKey(key);
  }

  map(cb, reversed = false) {
    if (this._linkedList.length === 0) return [];
    return this._linkedList.map(cb, reversed);
  }

  moveToBack(value) {
    const node = this.remove(value);

    if (!node) throw new Error('Cache#moveToBack- node not found');

    this.append(node);
  }

  moveToFront(value) {
    const node = this.remove(value);

    if (!node) throw new Error('Cache#moveToFront - node not found');

    this.prepend(node);
  }

  // Removes the last element from the cache.
  pop() {
    if (this._linkedList.length === 0) return null;

    return this.remove(this._linkedList.last);
  }

  prepend(value) {
    return this._addValue(value, 'prepend');
  }

  remove(value) {
    const node = this.getNode(value);

    if (node) {
      this._hashMap.remove(node);
      this._linkedList.remove(node);
    }

    return node;
  }

  // Removes the first element from the cache.
  shift() {
    if (this._linkedList.length === 0) return null;

    return this.remove(this._linkedList.first);
  }

  // Method aliases

  add(value) {
    return this.prepend(value);
  }

  contains(value) {
    return this.hasValue(value);
  }

  delete(value) {
    return this.remove(value);
  }

  has(value) {
    return this.hasValue(value);
  }

  include(value) {
    return this.hasValue(value);
  }

  includes(value) {
    return this.hasValue(value);
  }

  push(value) {
    return this.append(value);
  }

  unshift(value) {
    return this.prepend(value);
  }

  // Private Methods

  _addStartingValues(values) {
    values.forEach((value) => {
      this.append(value);
    });
  }

  // Accepts a value and an addMethod, which should be a string of either
  //  'append' or 'prepend'
  _addValue(value, addMethod) {
    let node = this.getNode(value);

    if (node) {
      this._linkedList.remove(node);
      this._linkedList[addMethod](node);
    } else {
      node = this._linkedList[addMethod](value);
      this._hashMap.addValue(node);
      if (this._linkedList.length > this._capacity) this._eject(addMethod);
    }

    return node;
  }

  // If adding to the end (addMethod = 'append'), remove from the front.
  // If adding to the front (addMethod = 'prepend'), remove from the end.
  _eject(addMethod) {
    if (this._linkedList.length === 0) return null;
    let removedNode;

    if (addMethod === 'append') {
      removedNode = this.remove(this._linkedList.first);
    } else if (addMethod === 'prepend') {
      removedNode = this.remove(this._linkedList.last);
    } else {
      throw new TypeError(`Error in Cache#eject: unrecognized input ${addMethod}`);
    }

    return removedNode;
  }

  _validateInput(params) {
    const paramsTypeError = new TypeError('Invalid input type for params');

    if (!isPlainObject(params)) throw paramsTypeError;

    const { values, capacity, keyGenerator } = params;
    const valuesError = new TypeError('Invalid input type for params.values');
    const capacityTypeError = new TypeError('Invalid input type for params.capacity');
    const capacityRangeError = new RangeError('Params.capacity must be greater than 0');
    const keyGeneratorError = new TypeError('keyGenerator should be a Function or null.');

    if (Object.keys(params).length === 0) return;
    if (values !== undefined && !isArray(values)) throw valuesError;
    if (capacity !== undefined) {
      if (!isInteger(capacity)) throw capacityTypeError;
      if (capacity <= 0) throw capacityRangeError;
    }
    if (!(typeof keyGenerator === 'function' || keyGenerator === undefined)) throw keyGeneratorError;
  }
};
