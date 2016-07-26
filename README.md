# JScope

[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coverage-badge]][coverage-url]
[![Climate Status][codeclimate-badge]][codeclimate-url]
[![Issues Open][issues-open-badge]][issues-url]
[![Issue Resolution][issues-reso-badge]][issues-url]

[![Version][version-badge]][npm-url]
[![Node][node-badge]][npm-url]
[![Downloads][downloads-badge]][npm-url]
[![Slack Status][slack-badge]][slack-url]
[![License][license-badge]][license-url]

[JScope][site-url]

Motivation
==========

Sometimes when you try write elegant code with fallback values you write something like this:

```JavaScript

  // The Common case

  var foo = function(options){

      // Ensure option value to prevent undefined value
      options = options || {}; // !!WARNING This line do not force the value type, so if the object passed is not a plain object it will broke your code

      /*************************************/
      /* Default value fallback resolution */
      /*************************************/

      // Solved with ternary operator
      options.bar  = options.bar ? options.bar : 'foo';

      // Solved with if statement
      if(!options.bar)
        options.bar  = 'foo';

      // Solved with stream conditional operator
      options.bar  = options.bar || 'foo';

      return options;
  }

```
Let's do it easier!!

```JavaScript

  // The JSCope case

  var jscope = require('jscope');

  var foo = function(options){
      options = jscope({
          'bar': 'foo',
          'foo': 'bar'
      }).$new(options);

      return options;
  }

  var result = foo({
      'frog': 'croac!',
      'bar': 'mooo'
  });

  // 'croac'
  console.log(result.frog);
  // 'bar'
  console.log(result.foo);
  // 'mooo'
  console.log(result.bar);
  // 'foo'
  console.log(result.$$root.bar);
  // 'foo'
  console.log(result.$$parent.bar);

  var child = result.$new({
      'bar': 'wow!!'
  });

  // 'foo'
  console.log(child.$$root.bar);
  // 'foo'
  console.log(child.$$parent.$$parent.bar);
  // 'mooo'
  console.log(child.$$parent.bar);
  // 'wow!!'
  console.log(child.bar);

```

As you can see you keep the data with persistence, and it's accesible by $$parent or $$root nodes, so your data never were so sure!!

[![NPM][npm-img]][npm-url]
[![GRID][coverage-img]][coverage-url]

Installation
============

Install with `npm install jscope --save`.


[![WTF][wtfpl-img]][wtfpl-url]

[site-url]: http://jscope.rubeniskov.com

[npm-url]: https://www.npmjs.com/package/jscope
[npm-img]: https://nodei.co/npm/jscope.png?downloads=true

[travis-url]: https://travis-ci.org/rubeniskov/jscope?branch=master
[travis-badge]: https://travis-ci.org/rubeniskov/jscope.svg

[license-url]: LICENSE
[license-badge]: https://img.shields.io/badge/license-WTFPL-blue.svg

[codeclimate-url]: https://codeclimate.com/github/rubeniskov/jscope
[codeclimate-badge]: https://codeclimate.com/github/rubeniskov/jscope/badges/gpa.svg

[coverage-url]: https://codecov.io/github/rubeniskov/jscope
[coverage-img]: https://codecov.io/gh/rubeniskov/jscope/branch/master/graphs/icicle.svg?width=400&height=72
[coverage-badge]: https://img.shields.io/codecov/c/github/rubeniskov/jscope.svg

[slack-url]: http://slack.rubeniskov.com/
[slack-badge]: http://slack.rubeniskov.com/badge.svg

[version-badge]: https://img.shields.io/npm/v/jscope.svg
[downloads-badge]: https://img.shields.io/npm/dm/jscope.svg
[node-badge]: https://img.shields.io/node/v/jscope.svg

[issues-url]: https://github.com/rubeniskov/jscope/issues
[issues-open-badge]: http://isitmaintained.com/badge/open/rubeniskov/jscope.svg
[issues-reso-badge]: http://isitmaintained.com/badge/resolution/rubeniskov/jscope.svg

[wtfpl-url]: http://www.wtfpl.net/
[wtfpl-img]: http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl.svg
