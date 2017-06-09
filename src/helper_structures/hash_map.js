import crypto from 'crypto';

// Accepts a params object with the keys:
//   values: array of values, and
//   hashingAlgorithm: hashingAlgorithm to be used, default: 'sha256'
export default class HashMap {
  constructor(params = {}) {
    this._cache = {};
    this._length = 0;
    this._hashingAlgorithm = params.hashingAlgorithm || 'sha256';

    if (params.values) this.addValues(params.values);
  }

  get length() {
    return this._length;
  }

  get keys() {
    return Object.keys(this._cache);
  }

  get values() {
    return Object.keys(this._cache).map((key) => this.getValue(key));
  }

  get cache() {
    return this._cache;
  }

  addValue(value) {
    const key = this.createKey(value);

    this.cache[key] = value;
    this._length += 1;
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
    return this._cache[key];
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

    if (this.hasKey(key)) this._length -= 1;
    delete this._cache[key];
  }

  // Method aliases
  add(value) {
    this.addValue(value);
  }

  getKey(value) {
    return this.createKey(value);
  }

  includes(value) {
    return this.hasValue(value);
  }

  insert(value) {
    this.addValue(value);
  }

  delete(value) {
    this.remove(value);
  }
};
