var partial = require('lodash.partial');

function ba(fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments, 0);
    var tmp = args[1];
    args[1] = args[0];
    args[0] = tmp;
    return fn.apply(null, args);
  };
}

function partialFn(_fn) {
  var reordered = ba(_fn);
  var args = Array.prototype.slice.call(arguments, 0);
  args[0] = reordered;
  return partial.apply(null, args);
}

module.exports = {
  ba: ba,
  partialFn: partialFn
};
