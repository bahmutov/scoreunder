# scoreunder

> Makes _ more functional.

[![NPM][scoreunder-icon] ][scoreunder-url]

[![Build status][scoreunder-ci-image] ][scoreunder-ci-url]
[![dependencies][scoreunder-dependencies-image] ][scoreunder-dependencies-url]
[![devdependencies][scoreunder-devdependencies-image] ][scoreunder-devdependencies-url]

[Underscore](http://underscorejs.org/) and [lodash](http://lodash.com/docs)
are great libraries, but they have tiny defect: they put the data
first and callback second. This arguments order makes it very difficult
to compose functions. *Scoreunder* provides tiny utility function to fix this.

```js
// underscore / lodash
function isPositive(a) { return a > 0; }
_.every([1, 2, 3], isPositive); // true
```

We cannot bind `isPositive` to `_.every` function even from the right,
because `_.every` has signature
`_.every(collection, [callback=identity], [thisArg])`

Using *scoreunder* we can:

```js
var under = require('scoreunder');
function isPositive(a) { return a > 0; }
var everyPositive = under.partialFn(_.every, isPositive);
everyPositive([1, 2, 3]); // true
```

## Install

NPM: `npm install scoreunder --save`

## API

### scoreunder.ba

Creates new function with swapped first and second argument

```js
_.every([1, 2, 3], isPositive); // true
var _every = under.ba(_.every);
_every(isPositive, [1, 2, 3]); // true
```

### scoreunder.partialFn

Reorders arguments using `.ba` then partial applies given function.

```js
var everyPositive = under.partialFn(_.every, isPositive);
everyPositive([1, 2, 3]); // true
```

## Why?

Because [Hey Underscore, You're Doing It Wrong!](https://www.youtube.com/watch?v=m3svKOdZijA)
by Brian Lonsdorf. Switching to another library like [wu](http://fitzgen.github.io/wu.js/)
or [ramda](https://github.com/CrossEye/ramda) is too extreme.

Plus I find that putting callback first leads to
[code that is more elegant](http://bahmutov.calepin.co/put-callback-first-for-elegance.html).

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/scoreunder/issues) on Github

## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[scoreunder-icon]: https://nodei.co/npm/scoreunder.png?downloads=true
[scoreunder-url]: https://npmjs.org/package/scoreunder
[scoreunder-ci-image]: https://travis-ci.org/bahmutov/scoreunder.png?branch=master
[scoreunder-ci-url]: https://travis-ci.org/bahmutov/scoreunder
[scoreunder-dependencies-image]: https://david-dm.org/bahmutov/scoreunder.png
[scoreunder-dependencies-url]: https://david-dm.org/bahmutov/scoreunder
[scoreunder-devdependencies-image]: https://david-dm.org/bahmutov/scoreunder/dev-status.png
[scoreunder-devdependencies-url]: https://david-dm.org/bahmutov/scoreunder#info=devDependencies
