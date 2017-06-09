import DoublyLinkedListNode from './doubly_linked_list_node';

export default class DoublyLinkedList {
  constructor(values = null) {
    this._head = new DoublyLinkedListNode();
    this._tail = new DoublyLinkedListNode();
    this._tail.prev = this._head;
    this._head.next = this._tail;
    this._length = 0;

    if (values) this.addValues(values);
  }

  get last() {
    if (this._length === 0) return null;
    return this._tail.prev;
  }

  get first() {
    if (this._length === 0) return null;
    return this._head.next;
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
    const node = value instanceof DoublyLinkedListNode ? value : new DoublyLinkedListNode(value);
    const oldLast = this._tail.prev;

    oldLast.next = node;
    node.prev = oldLast;
    node.next = this._tail;
    this._tail.prev = node;
    this._length += 1;
    
    return node;
  }

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

  remove(node) {
    node.next.prev = node.prev;
    node.prev.next = node.next;
    node.next = null;
    node.prev = null;
    this._length -= 1;

    return node;
  }

  // Method aliases
  add(value) {
    return this.append(value);
  }

  push(value) {
    return this.append(value);
  }

  unshift(value) {
    return this.prepend(value);
  }

  delete(node) {
    return this.remove(node);
  }
}
