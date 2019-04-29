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

<table>
<tr><td>

%FORK example%
</td><td>

![Showing the color differently](doc/doc.png)
</td></tr>
</table>

%~%