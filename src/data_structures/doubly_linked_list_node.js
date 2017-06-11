// Accepts an optional value.
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
    if (this._invalidNode(node)) throw new TypeError('Invalid node class.');
    this._prev = node;
  }

  set next(node) {
    if (this._invalidNode(node)) throw new TypeError('Invalid node class.');
    this._next = node;
  }

  _invalidNode(node) {
    return (!(node instanceof DoublyLinkedListNode) && (node !== null));
  }

  toString() {
    return this._value.toString();
  }
}
