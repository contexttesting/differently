## API

The package is available by importing its default function:

```js
import differently from 'differently'
```

%~%

```## differently =>
[
  ["objectA", "*"],
  ["objectB", "*"]
]
```

Compares the two given objects recursively. Returns the string containing the highlighted difference between the compared values. This is meant to work with `deepEqual`, where the order of elements in the array matters.

%EXAMPLE: example, ../src => differently%
%FORK example%

%~%