(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("crypto"));
	else if(typeof define === 'function' && define.amd)
		define("data_structures", ["crypto"], factory);
	else if(typeof exports === 'object')
		exports["data_structures"] = factory(require("crypto"));
	else
		root["data_structures"] = factory(root["crypto"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_23__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _doubly_linked_list_node = __webpack_require__(2);

var _doubly_linked_list_node2 = _interopRequireDefault(_doubly_linked_list_node);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = __webpack_require__(7);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Accepts an optional array of starting values.
var DoublyLinkedList = function () {
  function DoublyLinkedList() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, DoublyLinkedList);

    this._validateInput(params);
    params = Object.assign({ values: null, comparisonCb: function comparisonCb(a, b) {
        return a === b;
      } }, params);

    this._head = new _doubly_linked_list_node2.default();
    this._tail = new _doubly_linked_list_node2.default();
    this._tail.prev = this._head;
    this._head.next = this._tail;
    this._length = 0;
    this._comparisonCb = params.comparisonCb;

    if (params.values) this.addValues(params.values);
  }

  _createClass(DoublyLinkedList, [{
    key: 'addValues',


    // Adds values one after another to the back of the cache.
    value: function addValues(values) {
      var _this = this;

      values.forEach(function (value) {
        _this.append(value);
      });
    }

    // Adds a value to the rear of the cache.

  }, {
    key: 'append',
    value: function append(value) {
      var node = value instanceof _doubly_linked_list_node2.default ? value : new _doubly_linked_list_node2.default(value);
      var oldLast = this._tail.prev;

      oldLast.next = node;
      node.prev = oldLast;
      node.next = this._tail;
      this._tail.prev = node;
      this._length += 1;

      return node;
    }
  }, {
    key: 'forEach',
    value: function forEach(cb) {
      var reversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // options object will have startingNode, stoppingNode, and nextKey attributes
      var options = this._loopConditions(reversed);
      var currentNode = options.startingNode[options.nextKey];
      var idx = 0;

      while (currentNode !== options.stoppingNode) {
        cb(currentNode, idx);
        currentNode = currentNode[options.nextKey];
        idx += 1;
      }
    }
  }, {
    key: 'includes',
    value: function includes(value) {
      var _this2 = this;

      if (this._length === 0) return false;

      var found = false;
      var comparisonNode = value instanceof _doubly_linked_list_node2.default ? value : new _doubly_linked_list_node2.default(value);

      this.forEach(function (node) {
        if (_this2._comparisonCb(node, comparisonNode)) found = true;
      });
      return found;
    }
  }, {
    key: 'map',
    value: function map(cb) {
      var reversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var result = [];
      var mapCb = function mapCb(node, idx) {
        return result.push(cb(node, idx));
      };

      this.forEach(mapCb, reversed);

      return result;
    }

    // Removes a node from the back of the cache.

  }, {
    key: 'pop',
    value: function pop() {
      if (this.length === 0) return null;
      var lastNode = this.last;

      this._tail.prev = lastNode.prev;
      lastNode.prev.next = this._tail;
      lastNode.prev = null;
      lastNode.next = null;
      this._length -= 1;

      return lastNode;
    }

    // Adds a value to the front of the cache.

  }, {
    key: 'prepend',
    value: function prepend(value) {
      var node = value instanceof _doubly_linked_list_node2.default ? value : new _doubly_linked_list_node2.default(value);
      var oldFirst = this._head.next;

      oldFirst.prev = node;
      node.next = oldFirst;
      node.prev = this._head;
      this._head.next = node;
      this._length += 1;

      return node;
    }

    // Removes a node from the cache.

  }, {
    key: 'remove',
    value: function remove(node) {
      node.next.prev = node.prev;
      node.prev.next = node.next;
      node.next = null;
      node.prev = null;
      this._length -= 1;

      return node;
    }

    // Removes a node from the front of the cache.

  }, {
    key: 'shift',
    value: function shift() {
      if (this.length === 0) return null;
      var firstNode = this.first;

      this._head.next = firstNode.next;
      firstNode.next.prev = this._head;
      firstNode.prev = null;
      firstNode.next = null;
      this._length -= 1;

      return firstNode;
    }
  }, {
    key: '_loopConditions',
    value: function _loopConditions(reverseOrder) {
      return {
        startingNode: reverseOrder ? this._tail : this._head,
        stoppingNode: reverseOrder ? this._head : this._tail,
        nextKey: reverseOrder ? '_prev' : '_next'
      };
    }
  }, {
    key: '_validateInput',
    value: function _validateInput(params) {
      if (!((0, _isPlainObject2.default)(params) || params === null)) {
        throw new TypeError('params should be an object or null.');
      } else if (params) {
        var values = params.values,
            comparisonCb = params.comparisonCb;

        var valuesError = new TypeError('values should be an array or null.');
        var comparisonCbError = new TypeError('comparisonCb should be a Function or null.');

        console.log('comparisonCb', comparisonCb);

        if (!((0, _isArray2.default)(values) || values === undefined)) throw valuesError;
        if (!(comparisonCb instanceof Function || comparisonCb === undefined)) throw comparisonCbError;
      }
    }

    // Method aliases

  }, {
    key: 'add',
    value: function add(value) {
      return this.append(value);
    }
  }, {
    key: 'delete',
    value: function _delete(node) {
      return this.remove(node);
    }
  }, {
    key: 'push',
    value: function push(value) {
      return this.append(value);
    }
  }, {
    key: 'unshift',
    value: function unshift(value) {
      return this.prepend(value);
    }
  }, {
    key: 'last',
    get: function get() {
      if (this._length === 0) return null;
      return this._tail.prev;
    }
  }, {
    key: 'first',
    get: function get() {
      if (this._length === 0) return null;
      return this._head.next;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._length;
    }
  }]);

  return DoublyLinkedList;
}();

exports.default = DoublyLinkedList;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Accepts an optional value.
var DoublyLinkedListNode = function () {
  function DoublyLinkedListNode() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, DoublyLinkedListNode);

    this._next = null;
    this._prev = null;
    this._value = value;
  }

  _createClass(DoublyLinkedListNode, [{
    key: '_invalidNode',
    value: function _invalidNode(node) {
      return !(node instanceof DoublyLinkedListNode) && node !== null;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this._value.toString();
    }
  }, {
    key: 'next',
    get: function get() {
      return this._next;
    },
    set: function set(node) {
      if (this._invalidNode(node)) throw new TypeError('Invalid node class.');
      this._next = node;
    }
  }, {
    key: 'prev',
    get: function get() {
      return this._prev;
    },
    set: function set(node) {
      if (this._invalidNode(node)) throw new TypeError('Invalid node class.');
      this._prev = node;
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this._value = value;
    }
  }]);

  return DoublyLinkedListNode;
}();

exports.default = DoublyLinkedListNode;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = __webpack_require__(23);

var _crypto2 = _interopRequireDefault(_crypto);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Accepts a optional array of starting values.
var HashMap = function () {
  function HashMap() {
    var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, HashMap);

    this._validateInput(values);
    this._cache = {};
    this._length = 0;
    // `openssl list-message-digest-algorithms` to view all hashingAlgorithms
    this._hashingAlgorithm = 'sha256';

    if (values) this.addValues(values);
  }

  _createClass(HashMap, [{
    key: 'addValue',
    value: function addValue(value) {
      var key = this.createKey(value);

      this.cache[key] = value;
      this._length += 1;
      return value;
    }
  }, {
    key: 'addValues',
    value: function addValues(values) {
      var _this = this;

      values.forEach(function (value) {
        _this.addValue(value);
      });
    }
  }, {
    key: 'createKey',
    value: function createKey(value) {
      var hash = _crypto2.default.createHash(this._hashingAlgorithm);
      var key = hash.update(value.toString()).digest('hex');

      return key;
    }
  }, {
    key: 'getValue',
    value: function getValue(key) {
      return this._cache[key] ? this._cache[key] : null;
    }
  }, {
    key: 'hasKey',
    value: function hasKey(key) {
      return this._cache.hasOwnProperty(key);
    }
  }, {
    key: 'hasValue',
    value: function hasValue(value) {
      var key = this.createKey(value);

      return this.hasKey(key);
    }
  }, {
    key: 'remove',
    value: function remove(value) {
      var key = this.createKey(value);
      var removedVal = this._cache[key];

      if (removedVal) this._length -= 1;
      delete this._cache[key];

      return removedVal ? removedVal : null;
    }
  }, {
    key: '_validateInput',
    value: function _validateInput(values) {
      if (!((0, _isArray2.default)(values) || values === null)) throw new TypeError('input should be an array or null.');
    }

    // Method aliases

  }, {
    key: 'add',
    value: function add(value) {
      return this.addValue(value);
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return this.hasValue(value);
    }
  }, {
    key: 'delete',
    value: function _delete(value) {
      return this.remove(value);
    }
  }, {
    key: 'getKey',
    value: function getKey(value) {
      return this.createKey(value);
    }
  }, {
    key: 'includes',
    value: function includes(value) {
      return this.hasValue(value);
    }
  }, {
    key: 'include',
    value: function include(value) {
      return this.hasValue(value);
    }
  }, {
    key: 'insert',
    value: function insert(value) {
      return this.addValue(value);
    }
  }, {
    key: 'cache',
    get: function get() {
      return this._cache;
    }
  }, {
    key: 'keys',
    get: function get() {
      return Object.keys(this._cache);
    }
  }, {
    key: 'length',
    get: function get() {
      return this._length;
    }
  }, {
    key: 'values',
    get: function get() {
      var _this2 = this;

      return Object.keys(this._cache).map(function (key) {
        return _this2.getValue(key);
      });
    }
  }]);

  return HashMap;
}();

exports.default = HashMap;
;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(15);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(4),
    getRawTag = __webpack_require__(12),
    objectToString = __webpack_require__(13);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    getPrototype = __webpack_require__(11),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _doubly_linked_list = __webpack_require__(1);

var _doubly_linked_list2 = _interopRequireDefault(_doubly_linked_list);

var _hash_map = __webpack_require__(3);

var _hash_map2 = _interopRequireDefault(_hash_map);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isInteger = __webpack_require__(16);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _isPlainObject = __webpack_require__(7);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Accepts a params Object with keys:
//   values: array of starting values, and
//   capacity: integer for maximum length, default is Infinity
var Cache = function () {
  function Cache() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Cache);

    this._validateInput(params);
    params = Object.assign({ capacity: Infinity, values: null }, params);

    this._hashMap = new _hash_map2.default();
    this._linkedList = new _doubly_linked_list2.default();
    this._capacity = params.capacity;

    if (params.values) this._addStartingValues(params.values);
  }

  _createClass(Cache, [{
    key: 'append',
    value: function append(value) {
      return this._addValue(value, 'append');
    }
  }, {
    key: 'createKey',
    value: function createKey(value) {
      return this._hashMap.createKey(value);
    }
  }, {
    key: 'forEach',
    value: function forEach(cb) {
      var reversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this._linkedList.length === 0) return;
      this._linkedList.forEach(cb, reversed);
    }
  }, {
    key: 'getNode',
    value: function getNode(value) {
      var key = this.createKey(value);

      return this._hashMap.getValue(key);
    }
  }, {
    key: 'hasValue',
    value: function hasValue(value) {
      var key = this.createKey(value);

      return this._hashMap.hasKey(key);
    }
  }, {
    key: 'map',
    value: function map(cb) {
      var reversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this._linkedList.length === 0) return [];
      return this._linkedList.map(cb, reversed);
    }
  }, {
    key: 'moveToBack',
    value: function moveToBack(value) {
      var node = this.remove(value);

      if (!node) throw new Error('Cache#moveToBack- node not found');

      this.append(node);
    }
  }, {
    key: 'moveToFront',
    value: function moveToFront(value) {
      var node = this.remove(value);

      if (!node) throw new Error('Cache#moveToFront - node not found');

      this.prepend(node);
    }

    // Removes the last element from the cache.

  }, {
    key: 'pop',
    value: function pop() {
      if (this._linkedList.length === 0) return null;

      return this.remove(this._linkedList.last);
    }
  }, {
    key: 'prepend',
    value: function prepend(value) {
      return this._addValue(value, 'prepend');
    }
  }, {
    key: 'remove',
    value: function remove(value) {
      var node = this.getNode(value);

      if (node) {
        this._hashMap.remove(node);
        this._linkedList.remove(node);
      }

      return node;
    }

    // Removes the first element from the cache.

  }, {
    key: 'shift',
    value: function shift() {
      if (this._linkedList.length === 0) return null;

      return this.remove(this._linkedList.first);
    }

    // Method aliases

  }, {
    key: 'add',
    value: function add(value) {
      return this.prepend(value);
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return this.hasValue(value);
    }
  }, {
    key: 'delete',
    value: function _delete(value) {
      return this.remove(value);
    }
  }, {
    key: 'has',
    value: function has(value) {
      return this.hasValue(value);
    }
  }, {
    key: 'include',
    value: function include(value) {
      return this.hasValue(value);
    }
  }, {
    key: 'includes',
    value: function includes(value) {
      return this.hasValue(value);
    }
  }, {
    key: 'push',
    value: function push(value) {
      return this.append(value);
    }
  }, {
    key: 'unshift',
    value: function unshift(value) {
      return this.prepend(value);
    }

    // Private Methods

  }, {
    key: '_addStartingValues',
    value: function _addStartingValues(values) {
      var _this = this;

      values.forEach(function (value) {
        _this.append(value);
      });
    }

    // Accepts a value and an addMethod, which should be a string of either
    //  'append' or 'prepend'

  }, {
    key: '_addValue',
    value: function _addValue(value, addMethod) {
      var node = this.getNode(value);

      if (node) {
        this._linkedList.remove(node);
        this._linkedList[addMethod](node);
      } else {
        node = this._linkedList[addMethod](value);
        this._hashMap.addValue(node);
        if (this._linkedList.length > this._capacity) this._eject(addMethod);
      }

      return node;
    }

    // If adding to the end (addMethod = 'append'), remove from the front.
    // If adding to the front (addMethod = 'prepend'), remove from the end.

  }, {
    key: '_eject',
    value: function _eject(addMethod) {
      if (this._linkedList.length === 0) return null;
      var removedNode = void 0;

      if (addMethod === 'append') {
        removedNode = this.remove(this._linkedList.first);
      } else if (addMethod === 'prepend') {
        removedNode = this.remove(this._linkedList.last);
      } else {
        throw new TypeError('Error in Cache#eject: unrecognized input ' + addMethod);
      }

      return removedNode;
    }
  }, {
    key: '_validateInput',
    value: function _validateInput(params) {
      var paramsTypeError = new TypeError('Invalid input type for params');

      if (!(0, _isPlainObject2.default)(params)) throw paramsTypeError;

      var keys = Object.keys(params);
      var valuesError = new TypeError('Invalid input type for params.values');
      var capacityTypeError = new TypeError('Invalid input type for params.capacity');
      var capacityRangeError = new RangeError('Params.capacity must be greater than 0');

      if (keys.length === 0) return;
      if (keys.includes('values') && !(0, _isArray2.default)(params.values)) throw valuesError;
      if (keys.includes('capacity')) {
        if (!(0, _isInteger2.default)(params.capacity)) throw capacityTypeError;
        if (params.capacity <= 0) throw capacityRangeError;
      }
    }
  }, {
    key: 'capacity',
    get: function get() {
      return this._capacity;
    }
  }, {
    key: 'first',
    get: function get() {
      if (this._linkedList.length === 0) return null;
      return this._linkedList.first;
    }
  }, {
    key: 'last',
    get: function get() {
      if (this._linkedList.length === 0) return null;
      return this._linkedList.last;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._linkedList.length;
    }
  }]);

  return Cache;
}();

exports.default = Cache;
;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cache = exports.HashMap = exports.DoublyLinkedList = exports.DoublyLinkedListNode = undefined;

var _doubly_linked_list_node = __webpack_require__(2);

var _doubly_linked_list_node2 = _interopRequireDefault(_doubly_linked_list_node);

var _doubly_linked_list = __webpack_require__(1);

var _doubly_linked_list2 = _interopRequireDefault(_doubly_linked_list);

var _hash_map = __webpack_require__(3);

var _hash_map2 = _interopRequireDefault(_hash_map);

var _cache = __webpack_require__(8);

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DoublyLinkedListNode = _doubly_linked_list_node2.default;
exports.DoublyLinkedList = _doubly_linked_list2.default;
exports.HashMap = _hash_map2.default;
exports.Cache = _cache2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(14);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(4);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(10);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20);

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

module.exports = isInteger;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(21);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__(19);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17),
    isSymbol = __webpack_require__(18);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data_structures.js.map