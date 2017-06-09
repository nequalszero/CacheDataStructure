// import { createHash } from 'crypto';
import LinkedListNode from './helper_structures/doubly_linked_list_node';

export default class Cache {
  constructor() {
    this._name = 'Cache';
    this._values = new LinkedListNode();
  }

  get name() {
    return this._name;
  }

  get values() {
    return this._values;
  }
}
