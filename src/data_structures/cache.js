import DoublyLinkedList from './doubly_linked_list';
import HashMap from './hash_map';
import isArray from 'lodash/isArray';
import isInteger from 'lodash/isInteger';

// Accepts a params Object with keys:
//   values: array of starting values, and
//   capacity: integer for maximum length, default is Infinity
export default class Cache {
  constructor(params = {}) {
    this._validateInput(params);
    this._hashMap = new HashMap();
    this._linkedList = new DoublyLinkedList();
    this._length = 0;
    this._capacity = params.capacity ? params.capacity : Infinity;

    if (params.values) this.addValues(params.values);
  }

  get capacity() {
    return this._capacity;
  }

  get first() {
    if (this._length === 0) return null;
    return this._linkedList.first;
  }

  get last() {
    if (this._length === 0) return null;
    return this._linkedList.last;
  }

  get length() {
    return this._length;
  }

  addValues(values) {
    values.forEach((value) => {
      this.append(value);
    });
  }

  append(value) {
    return this._addValue(value, 'append');
  }

  createKey(value) {
    return this._hashMap.createKey(value);
  }

  forEach(cb, reversed = false) {
    if (this._length === 0) return;
    this._linkedList.forEach(cb, reversed);
  }

  hasValue(value) {
    return this._hashMap.includes(value);
  }

  map(cb, reversed = false) {
    if (this._length === 0) return [];
    return this._linkedList.map(cb, reversed);
  }

  prepend(value) {
    return this._addValue(value, 'prepend');
  }

  remove(value) {
    value = this._getValue(value);

    if (value) {
      this._hashMap.remove(value);
      this._linkedList.remove(value);
      this._length -= 1;
    }

    return value;
  }

  // Accepts a value and an addMethod, which should be a string of either
  //  'append' or 'prepend'
  _addValue(value, addMethod) {
    let node = this._getValue(value);

    if (node) {
      this._linkedList.remove(node);
      this._linkedList[addMethod](node);
    } else {
      node = this._linkedList[addMethod](value);
      this._hashMap.addValue(node);
      this._length += 1;
      if (this._length > this._capacity) this._eject(addMethod);
    }

    return node;
  }

  // If adding to the end (addMethod = 'append'), remove from the front.
  // If adding to the front (addMethod = 'prepend'), remove from the end.
  _eject(addMethod) {
    if (addMethod === 'append') {
      this._hashMap.remove(this._linkedList.first);
      this._linkedList.remove(this._linkedList.first);
    } else if (addMethod === 'prepend') {
      this._hashMap.remove(this._linkedList.last);
      this._linkedList.remove(this._linkedList.last);
    }
    this._length -= 1;
  }

  _getValue(value) {
    const key = this.createKey(value);

    return this._hashMap.getValue(key);
  }

  _validateInput(params) {
    const keys = Object.keys(params);
    const valuesError = new TypeError('Invalid input type for params.values');
    const capacityTypeError = new TypeError('Invalid input type for params.capacity');
    const capacityRangeError = new RangeError('Params.capacity must be greater than 0');

    if (keys.length === 0) return;
    if (keys.includes('values') && !isArray(params.values)) throw valuesError;
    if (keys.includes('capacity')) {
      if (!isInteger(params.capacity)) throw capacityTypeError;
      if (params.capacity <= 0) throw capacityRangeError;
    }
  }

  // Method aliases
  contains(value) {
    return this.hasValue(value);
  }

  delete(value) {
    return this.remove(value);
  }

  include(value) {
    return this.hasValue(value);
  }

  includes(value) {
    return this.hasValue(value);
  }
};
