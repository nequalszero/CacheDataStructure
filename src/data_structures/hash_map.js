import crypto from 'crypto';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

// Accepts a optional array of starting values.
export default class HashMap {
  constructor(params = null) {
    this._validateInput(params);
    params = Object.assign(
      { values: null, keyGenerator: ((value) => (value)) },
      params
    );

    this._cache = {};
    this._length = 0;
    this._keyGenerator = params.keyGenerator;
    // `openssl list-message-digest-algorithms` to view all hashingAlgorithms
    this._hashingAlgorithm = 'sha256';

    if (params.values) this.addValues(params.values);
  }

  get cache() {
    return this._cache;
  }

  get keys() {
    return Object.keys(this._cache);
  }

  get keyGenerator() {
    return this._keyGenerator;
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
    const processedValue = this._keyGenerator(value);
    const key = hash.update(JSON.stringify(processedValue)).digest('hex');

    return key;
  }

  getValue(key) {
    const value = this._cache[key];

    return (value !== undefined) ? value : null;
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

  _validateInput(params) {
    if (!(isPlainObject(params) || params === null)) {
      throw new TypeError('params should be an object or null.');
    } else if (params) {
      const {values, keyGenerator} = params;
      const valuesError = new TypeError('values should be an array or null.');
      const keyGeneratorError = new TypeError('keyGenerator should be a Function or null.');

      if (!(isArray(values) || values === undefined)) throw valuesError;
      if (!(typeof keyGenerator === 'function' || keyGenerator === undefined)) throw keyGeneratorError;
    }
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
