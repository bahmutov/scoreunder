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
