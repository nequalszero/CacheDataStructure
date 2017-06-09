export default class DoublyLinkedListNode {
  constructor(value = null) {
    this._value = value;
    this._prev = null;
    this._next = null;
  }

  get value() {
    return this._value;
  }

  get prev() {
    return this._prev;
  }

  get next() {
    return this._next;
  }

  set prev(node) {
    this._prev = node;
  }

  set next(node) {
    this._next = node;
  }

  toString() {
    return this._value.toString();
  }
}
