// Accepts an optional value.
export default class DoublyLinkedListNode {
  constructor(value = null) {
    this._next = null;
    this._prev = null;
    this._value = value;
  }

  get next() {
    return this._next;
  }

  get prev() {
    return this._prev;
  }

  get value() {
    return this._value;
  }

  set next(node) {
    if (this._invalidNode(node)) throw new TypeError('Invalid node class.');
    this._next = node;
  }

  set prev(node) {
    if (this._invalidNode(node)) throw new TypeError('Invalid node class.');
    this._prev = node;
  }

  set value(value) {
    this._value = value;
  }

  _invalidNode(node) {
    return (!(node instanceof DoublyLinkedListNode) && (node !== null));
  }

  toString() {
    return this._value.toString();
  }
}
