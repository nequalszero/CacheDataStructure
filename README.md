# Data Structures
## Contents
- [Cache](#cache)  
  - [Cache Getters](#cache-getters)  
  - [Cache Instance Methods](#cache-instance-methods)  
- [Hash Map](#hash-map)  
  - [Hash Map Getters](#hash-map-getters)  
  - [Hash Map Instance Methods](#hash-map-instance-methods)  
- [Doubly Linked List](#doubly-linked-list)  
  - [Doubly Linked List Getters](#doubly-linked-list-getters)  
  - [Doubly Linked List Setters](#doubly-linked-list-setters)  
  - [Doubly Linked List Instance Methods](#doubly-linked-list-instance-methods)  


## About
Personal project experimenting with making NPM packages and creating data  structures.  The currently included structures are a `cache`, a `doubly linked list`, and a `hash map`.

## Usage
Installation via `npm install --save nequalszero-data-structures`.

### ES5
```javascript
// To import all data structures.
var dataStructures = require('nequalszero-data-structures');

// To import a single data structure.
var Cache = require('nequalszero-data-structures/cache');
var DoublyLinkedList = require('nequalszero-data-structures/doubly_linked_list');
```

### ES6
```javascript
// To import all data structures.
import * as dataStructures from 'nequalszero-data-structures';

// To import a single data structure.
import Cache from 'nequalszero-data-structures/cache';
import DoublyLinkedList from 'nequalszero-data-structures/doubly_linked_list';

import { Cache } from 'nequalszero-data-structures';
import { DoublyLinkedList } from 'nequalszero-data-structures';
```

## API
### Cache
The constructor for the Cache accepts an optional `options` object that can have keys `capacity`, `values`, and `keyGenerator`.  
* The default `capacity` of the Cache is Infinity.  
* If an array of `values` are provided, the Cache will initialize with the values in the order that they are provided.  
* The `keyGenerator` option should be a function used to serialize a value, and determine whether a value exists in the Cache, treating a value to be an actual value, not a `DoublyLinkedListNode` instance.  In turn the `Cache#includes` method will recognize both values and instances of `DoublyLinkedListNode`.  The default `keyGenerator` simply compares the values of the nodes.  Therefore it's recommended to provide a custom `keyGenerator` if the node values are objects or custom class instances.

```javascript
// Example of providing values
const cache1 = new Cache({values: [1, 2, 3]});
cache1.first // returns a DoublyLinkedListNode with value 1.
cache1.last // returns a DoublyLinkedListNode with value 3.

// Example providing a keyGenerator
const cache2 = new Cache({ keyGenerator: (value) => (
  `${value.firstName} ${value.lastName}`
)});
cache2.add({id: 1, firstName: "Charlie", lastName: "Brown"});
cache2.add({id: 2, firstName: "Lucy", lastName: "Brown"});
cache2.add({id: 3, firstName: "Calvin", lastName: "Hobbes"});
cache2.includes({id: 1, firstName: "Charlie", lastName: "Brown"}); // true
cache2.includes({firstName: "Charlie", lastName: "Brown"}); // true
cache2.includes({lastName: "Brown"}); // false
const firstNode = cache2.first; // returns DoublyLinkedListNode instance
cache2.includes(firstNode); // true
```

#### Cache Getters
* `capacity`

  Returns the capacity of the cache.

* `first`

  Returns the first node in the cache.

* `keyGenerator`

  Returns the keyGenerator function being used by the cache.

* `last`

  Returns the last node in the cache.

* `length`

  Returns the number of nodes in the cache.

#### Cache Instance Methods

* `#add(value)`

  Alias for #prepend.

* `#append(value)`

  Accepts a value or a node. Creates a new node and appends it to the tail end of the cache if the value does not already exist in the cache. If the value already exists, it updates the existing node. Returns the node.

* `#contains(value)`

  Alias for #hasValue.

* `#createKey(value)`

  Accepts a node or value, and returns the hash key. Calls HashMap#createKey.

* `#delete(value)`

  Alias for #remove.

* `#forEach(cb, reversed = false)`

  Iterator for looping through the nodes from head to tail order.  Applies the given callback to each node.  Goes in reverse order from tail to head if the reversed boolean is true.

* `#getNode(value)`

  Accepts a value or a node. Retrieves the node from the hash matching the given value.  Returns null if no key matches the key created for the value provided.

* `#has(value)`

  Alias for #hasValue.

* `#hasValue(value)`

  Accepts a value or a node. Returns true if the value exists in the cache, false if it does not.

* `#include(value)`

  Alias for #hasValue.

* `#includes(value)`

  Alias for #hasValue.

* `#map(cb, reversed = false)`

  Similar to #forEach but puts the result of invoking the callback function on each node into an array.  Goes in reverse order from tail to head if the reversed boolean is true.  Returns an array.

* `#moveToBack(value)`

  Accepts a value or a node. Moves the matching node to the tail of the cache. Throws an error if the requested node does not exist.

* `#moveToFront(value)`

  Accepts a value or a node. Moves the matching node to the head of the cache. Throws an error if the requested node does not exist.

* `#pop`

  Returns null if the cache is empty. Removes and returns the last node in the cache otherwise.

* `#prepend(value)`

  Accepts a value or a node. Creates a new node and adds it to the head side of the cache if its value does not already exist.  If the value already exists, updates the position of the existing node. Returns the node.

* `#push(value)`

  Alias for #append.

* `#remove(value)`

  Accepts a value or a node. Removes the node from the cache and returns it if it exists.  Returns null if it does not exist.

* `#shift`

  Returns null if the cache is empty. Removes and returns the first node in the cache otherwise.

* `#unshift(value)`

  Alias for #prepend.


### Hash Map
The constructor for the HashMap accepts an optional `options` object that can have keys, `values`, and `keyGenerator`.  
* If an array of `values` are provided, the HashMap will initialize with the values in the order that they are provided.  
* The `keyGenerator` option should be a function used to serialize a value, and determine whether a value exists in the HashMap. The default `keyGenerator` simply compares by value.  Therefore it's recommended to provide a custom `keyGenerator` if the node values are objects or custom class instances.

```javascript
// Example of providing values.
const hashMap1 = new HashMap({values: [1, 2, 3]});
hashMap1.includes(1) // true
hashMap1.includes(4) // false

// Example providing a keyGenerator.
const hashMap2 = new HashMap({ keyGenerator: (value) => (
  `${value.firstName} ${value.lastName}`
)});
hashMap2.add({id: 1, firstName: "Charlie", lastName: "Brown"});
hashMap2.add({id: 2, firstName: "Lucy", lastName: "Brown"});
hashMap2.add({id: 3, firstName: "Calvin", lastName: "Hobbes"});
hashMap2.includes({id: 1, firstName: "Charlie", lastName: "Brown"}); // true
hashMap2.includes({firstName: "Charlie", lastName: "Brown"}); // true
hashMap2.includes({lastName: "Brown"}); // false
```

#### Hash Map Getters
* `cache`

  Returns the cache object of the hash map.

* `keys`

  Returns the keys in the hash map.

* `keyGenerator`

  Returns the keyGenerator function being used by the hash map.

* `length`

  Returns the number of nodes in the hash map.

* `values`

  Returns the values in the hash map.

#### Hash Map Instance Methods

* `#add(value)`

  Alias for #addValue.

* `#addValue(value)`

  Adds the value to the cache and returns the value.

* `#contains(value)`

  Alias for #hasValue.

* `#createKey(value)`

  Creates a key for the value using an `sha256` hashing algorithm from the crypto library on the result of calling the keyGenerator function on the value. Returns the key.

* `#delete(value)`

  Alias for #remove.

* `#getKey(value)`

  Alias for #createKey.

* `#getValue(key)`

  Accepts a key. Retrieves the value from the hash matching the given key.  Returns null if no value matches the key.

* `#hasKey(key)`

  Returns true if the key exists in the hash map, false if it does not.

* `#hasValue(value)`

  Returns true if the value exists in the hash map, false if it does not.

* `#include(value)`

  Alias for #hasValue.

* `#includes(value)`

  Alias for #hasValue.

* `#insert(value)`

  Alias for #addValue.

* `#remove(value)`

  Removes the value from the hash map and returns it if it exists.  Returns null if it does not exist.


### Doubly Linked List
The constructor for the HashMap accepts an optional `options` object that can have keys, `values`, and `comparisonCb`.  
* If an array of `values` are provided, the Cache will initialize with the values in the order that they are provided.  
* The `comparisonCb` option should be a function used to compare 2 nodes, and determine whether a node exists in the list. The default `comparisonCb` simply compares by value.  Therefore it's recommended to provide a custom `comparisonCb` if the node values are objects or custom class instances.

```javascript
// Example of providing values.
const linkedList1 = new DoublyLinkedList({values: [1, 2, 3]});
linkedList1.first; // returns DoublyLinkedListNode with value of 1
linkedList1.last; // returns DoublyLinkedListNode with value of 3
linkedList1.includes(1) // true
linkedList1.includes(4) // false

// Example providing a comparisonCb.
const linkedList2 = new DoublyLinkedList({ comparisonCb: (node) => (
  `${node.value.firstName} ${node.value.lastName}`
)});
linkedList2.add({id: 1, firstName: "Charlie", lastName: "Brown"});
linkedList2.add({id: 2, firstName: "Lucy", lastName: "Brown"});
linkedList2.add({id: 3, firstName: "Calvin", lastName: "Hobbes"});
linkedList2.includes({id: 1, firstName: "Charlie", lastName: "Brown"}); // true
linkedList2.includes({firstName: "Charlie", lastName: "Brown"}); // true
linkedList2.includes({lastName: "Brown"}); // false
```

#### Doubly Linked List Getters
* `comparisonCb`

  Returns the comparisonCb function being used by the linked list.

* `first`

  Returns the first node in the linked list.

* `last`

  Returns the last node in the linked list.

* `length`

  Returns the number of nodes in the linked list.

* `values`

  Returns the values in the linked list.

#### Doubly Linked List Setters

* `comparisonCb(cb)`

  Sets the comparisonCb function of the linked list.  Throws a TypeError if the cb provided is not a function.

#### Doubly Linked List Instance Methods

* `#add(value)`

  Alias for #append.

* `#append(value)`

  Accepts a value or a node. Creates a new node if needed and appends it to the tail end of the linked list. Returns the node.

* `#delete(value)`

  Alias for #remove.

* `#forEach(cb, reversed = false)`

  Iterator for looping through the nodes from head to tail order.  Applies the given callback to each node.  Goes in reverse order from tail to head if the reversed boolean is true.

* `#includes(value)`

  Accepts a value or node. Returns true if the value exists in the linked list, false if it does not.

* `#map(cb, reversed = false)`

  Similar to #forEach but puts the result of invoking the callback function on each node into an array.  Goes in reverse order from tail to head if the reversed boolean is true.  Returns an array.

* `#pop`

  Returns null if the linked list is empty. Removes and returns the last node in the linked list otherwise.

* `#prepend(value)`

  Accepts a value or a node. Creates a new node if needed and adds it to the head side of the linked list. Returns the node.

* `#push(value)`

  Alias for #append.

* `#remove(value)`

  Accepts a value or a node. Removes the node from the linked list and returns it if it exists.  Returns null if it does not exist.

* `#shift`

  Returns null if the linked list is empty. Removes and returns the first node in the linked list otherwise.

* `#unshift(value)`

  Alias for #prepend.
