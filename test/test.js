gt.module('scoreunder');
var _ = require('lodash');
var under = require('..');

function isPositive(a) { return a > 0; }

gt.test('positive', function () {
  gt.ok(isPositive(1));
  gt.ok(!isPositive(-1));
});

gt.test('reorders args', function () {
  gt.func(under.ba, 'ba is a function');
  function sum(a, b) {
    console.assert(a === 10, 'value of a ' + a);
    console.assert(b === 20, 'value of b ' + b);
    return a + b;
  }
  gt.equal(sum(10, 20), 30, 'raw sum');
  var baSum = under.ba(sum);
  gt.equal(baSum(20, 10), 30, 'reordered sum');
});

gt.test('reorders _ functions', function () {
  gt.ok(_.every([1, 2, 3], isPositive));
  var _every = under.ba(_.every);
  gt.func(_every, 'returns a function');
  gt.ok(_every(isPositive, [1, 2, 3]));
});

gt.test('reorder and bind', function () {
  var everyPositive = under.partialFn(_.every, isPositive);
  gt.ok(everyPositive([1, 2, 3]));
  gt.ok(!everyPositive([1, -2, 3]));
});

gt.test('_ traditional way', function () {
  gt.ok(_.every([1, 2, 3], isPositive));
  // we cannot bind "isPositive" to "_.every" function even from the right,
  // because _.every has signature
  // _.every(collection, [callback=identity], [thisArg])
});

gt.test('partial apply multiple arguments', function () {
  var _first = under.partialFn(_.first);
  var _first2 = _.partial(_first, 2, 'fooBar');
  var result = _first2();
  gt.aequal(result, ['f', 'o']);
});

gt.module('strings to chars');

gt.test('first two elements of an array', function () {
  var firstTwo = under.partialFn(_.first, 2);
  gt.func(firstTwo, 'returns a function');
  var result = firstTwo(['a', 'b', 'c', 'd']);
  gt.aequal(result, ['a', 'b']);
});

gt.test('first two elements of an array again', function () {
  var firstTwo = under.partialFn(_.first, 2);
  gt.func(firstTwo, 'returns a function');
  var result = firstTwo(['a', 'b', 'c', 'd']);
  gt.aequal(result, ['a', 'b']);
});

gt.test('first chars of a string without reordering', function () {
  var result = _.first('fooBar', 2);
  gt.aequal(result, ['f', 'o']);
});

gt.test('first chars of a string in steps', function () {
  var _first = under.ba(_.first);
  var result = _first(2, 'fooBar');
  gt.aequal(result, ['f', 'o']);
});

gt.test('first chars of a string with partial apply', function () {
  var _first = under.ba(_.first);
  var _first2 = _.partial(_first, 2);
  var result = _first2('fooBar');
  gt.aequal(result, ['f', 'o']);
});

gt.test('first chars of a string in single step', function () {
  var _first2 = under.partialFn(_.first, 2);
  var result = _first2('fooBar');
  gt.aequal(result, ['f', 'o']);
});

gt.test('first numbers with unary', function () {
  var firstTwo = under.partialFn(_.first, 2);
  var result = _.map([[6, 1, 4, 8], [9, 5, 10, 1]], function (k) {
    return firstTwo(k);
  });
  gt.aequal(result, [[6, 1], [9, 5]]);
});

function unary(fn) {
  return function (arg) {
    return fn(arg);
  };
}

gt.test('first characters from list of words', function () {
  var firstTwo = under.partialFn(_.first, 2);
  var mapFirstTwo = under.partialFn(_.map, unary(firstTwo));
  var result = mapFirstTwo(['hello', 'world']);
  gt.aequal(result, [['h', 'e'], ['w', 'o']]);
});
