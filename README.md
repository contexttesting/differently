# differently

[![npm version](https://badge.fury.io/js/differently.svg)](https://npmjs.org/package/differently)

`differently` Compares JS Objects With Color Difference.

```sh
yarn add differently
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import differently from 'differently'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

```## differently =>
[
  ["objectA", "*"],
  ["objectB", "*"]
]
```

Compares the two given objects recursively. Returns the string containing the highlighted difference between the compared values. This is meant to work with `deepEqual`, where the order of elements in the array matters.

```js
import differently from 'differently'

const log = (s) => console.log('%s\n', s)
let s
// deepStrictEqual([1,2], [2,1])
s = differently(null, {})
log(s)

s = differently({}, null)
log(s)

s = differently(new Date(2018, 10), new Date(2017, 10))
log(s)

s = differently(new Date(2018, 10), [])
log(s)

s = differently(['test'], {})
log(s)

s = differently(10, '11')
log(s)

s = differently(Symbol('test'), false)
log(s)

s = differently(Symbol('test'), new Date(2019, 10))
log(s)

s = differently({ a: 0, test: 1, common: {
  tt: 10,
  ta: [1, 3],
} }, { a: 0, testa: 2, common: {
  tt: 20,
  ta: [1, 2],
} })
log(s)

log(differently([1], [2, Infinity]))
```
```
- null
+ [object Object]

- [object Object]
+ null

- Thu Nov 01 2018 00:00:00 GMT+0300 (MSK)
+ Wed Nov 01 2017 00:00:00 GMT+0300 (MSK)

- Thu Nov 01 2018 00:00:00 GMT+0300 (MSK)
+ Array[]

- Array[test]
+ [object Object]

- 10
+ 11

- Symbol(test)
+ false

- Symbol(test)
+ Fri Nov 01 2019 00:00:00 GMT+0300 (MSK)

- test: 1
+ testa: 2
  common
    tt
    - 10
    + 20
    ta.Array
    [1]
    - 3
    + 2

[0]
- 1
+ 2
[1]
+ Infinity
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright


  (c) [Context Testing](https://contexttesting.com) 2019


<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>