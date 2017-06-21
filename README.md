# Data Structures
## Contents
[Cache](#cache)

[HashMap](#hash-map)

[DoublyLinkstedList](#doubly-linked-list)

[DoublyLinkedListNode](#doubly-linked-list-node)

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
The constructor for the Cache acceps an optional `options` object that can have keys `capacity`, `values`, and `keyGenerator`.  
* The default `capacity` of the Cache is Infinity.  
* If an array of `values` are provided, the Cache will initialize with the values in the order that they are provided.  
* The `keyGenerator` option should be a function used to serialize a value, and determine whether a value exists in the Cache, treating a value to be an actual value, not a `DoublyLinkedListNode` instance.  In turn the `Cache#includes` method will recognize both values and instances of `DoublyLinkedListNode`.  The default `keyGenerator` simply compares the values of the nodes.  Therefore it's recommended to provide a custom `keyGenerator` if the node values are `objects` or custom `classes`.

```javascript
// Example of providing values
const cache1 = new Cache({values: [1, 2, 3]});
cache.first // returns a DoublyLinkedListNode with value 1.
cache.last // returns a DoublyLinkedListNode with value 3.

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

#### Getters
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

#### Instance methods

* `#add(value)`

  Alias for #prepend.

* `#append(value)`

  Accepts a value or a node. Creates a new node and appends it to the tail end of the cache if the value does not already exist in the cache. If the value already exists, it updates the existing node. Returns the node.

* `#contains(value)`

  Alias for #hasValue.

* `#createKey(value)`

  Accepts a node or value, and returns the hash key.

* `#delete(value)`

  Alias for #remove.

* `#forEach(cb, reversed = false)`

  Iterator for looping through the nodes from head to tail order.  Applies the given callback to each node.  Goes in reverse order from tail to head if the reversed boolean is true.

* `#getNode(value)`

  Accepts a value or a node. Retrieves the node from the hash matching the given value.  Returns null if no key matches key created for the value provided.

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

  Accepts a value or a node. Removes the node from the cache and returns it if it existed.  Returns null if it does not exist.

* `#shift`

  Returns null if the cache is empty. Removes and returns the first node in the cache otherwise.

* `#unshift(value)`

  Alias for #prepend.
