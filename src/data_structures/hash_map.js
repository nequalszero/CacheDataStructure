import crypto from 'crypto';
import isArray from 'lodash/isArray';

// Accepts a optional array of starting values.
export default class HashMap {
  constructor(values = null) {
    this._validateInput(values);
    this._cache = {};
    this._length = 0;
    // `openssl list-message-digest-algorithms` to view all hashingAlgorithms
    this._hashingAlgorithm = 'sha256';

    if (values) this.addValues(values);
  }

  get cache() {
    return this._cache;
  }

  get keys() {
    return Object.keys(this._cache);
  }

  get length() {
    return this._length;
  }

  get values() {
    return Object.keys(this._cache).map((key) => this.getValue(key));
  }

  addValue(value) {
    const key = this.createKey(value);

    this.cache[key] = value;
    this._length += 1;
    return value;
  }

  addValues(values) {
    values.forEach((value) => {
      this.addValue(value);
    });
  }

  createKey(value) {
    const hash = crypto.createHash(this._hashingAlgorithm);
    const key = hash.update(value.toString()).digest('hex');

    return key;
  }

  getValue(key) {
    return this._cache[key] ? this._cache[key] : null;
  }

  hasKey(key) {
    return this._cache.hasOwnProperty(key);
  }

  hasValue(value) {
    const key = this.createKey(value);
    
    return this.hasKey(key);
  }

  remove(value) {
    const key = this.createKey(value);
    let removedVal = this._cache[key];

    if (removedVal) this._length -= 1;
    delete this._cache[key];

    return removedVal ? removedVal : null;
  }

  _validateInput(values) {
    if (!(isArray(values) || values === null)) throw new TypeError('input should be an array or null.');
  }

  // Method aliases
  add(value) {
    return this.addValue(value);
  }

  contains(value) {
    return this.hasValue(value);
  }

  delete(value) {
    return this.remove(value);
  }

  getKey(value) {
    return this.createKey(value);
  }

  includes(value) {
    return this.hasValue(value);
  }

  include(value) {
    return this.hasValue(value);
  }

  insert(value) {
    return this.addValue(value);
  }
};
