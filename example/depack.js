'use strict';
/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const d = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function h(e, m) {
  return (m = d[m]) ? `\x1b[${m}m${e}\x1b[0m` : e;
}
;const n = (...e) => {
  let m = -1;
  return "%s%s".replace(/%s/g, () => {
    m++;
    return e[m];
  });
};
function t(e, m) {
  let r = 0;
  const k = (b, a = void 0) => {
    const f = " ".repeat(2 * r);
    a = void 0 !== a ? h("+ " + u(a), "green") : null;
    b = void 0 !== b ? h("- " + u(b), "red") : null;
    const g = [];
    b && g.push(n(f, b));
    a && g.push(n(f, a));
    return g.join("\n");
  }, v = b => {
    const a = " ".repeat(2 * r);
    return n(a, b);
  }, w = (b, a) => {
    if (b instanceof Date && a instanceof Date) {
      var f = b.getTime() != a.getTime() ? !1 : void 0;
      return f ? "" : k(b, a);
    }
    if (b instanceof Date && !(a instanceof Date) || !(b instanceof Date) && a instanceof Date || Array.isArray(b) && !Array.isArray(a) || !Array.isArray(b) && Array.isArray(a)) {
      return k(b, a);
    }
    if (y(b) && y(a) || !y(b) && y(a) || y(b) && !y(a)) {
      return b != a ? k(b, a) : "";
    }
    if (b.constructor && !a.constructor) {
      return k(b.constructor.name, a);
    }
    if (!b.constructor && a.constructor) {
      return k(b, a.constructor.name);
    }
    if (b.constructor && a.constructor) {
      if (b.constructor.name != a.constructor.name) {
        return k(b.constructor.name, a.constructor.name);
      }
      f = b.valueOf();
      var g = a.valueOf();
      if (y(f) && y(g) && f != g) {
        return k(f, g);
      }
    }
    if (Array.isArray(b) && Array.isArray(a)) {
      let q;
      f = b.map((l, p) => {
        q = p;
        (l = w(l, a[p])) && (l = `${v(`[${p}]`)}\n${l}`);
        return l;
      }).filter(Boolean);
      g = a.slice(q + 1).map((l, p) => `${v(`[${q + p + 1}]`)}\n${k(void 0, l)}`);
      return [...f, ...g].join("\n");
    }
    if ("object" == typeof b && "object" == typeof a) {
      const q = [], l = [], p = [];
      Object.keys(b).forEach(c => {
        c in a ? p.push(c) : l.push(c);
      });
      Object.keys(a).forEach(c => {
        c in b || q.push(c);
      });
      f = l.map(c => k(`${c}${`: ${u(b[c])}`}`));
      g = q.map(c => k(void 0, `${c}: ${u(a[c])}`));
      const B = p.map(c => {
        r++;
        const z = w(b[c], a[c]);
        let x = "";
        z && (x += v(Array.isArray(b[c]) && Array.isArray(a[c]) ? `${c}.Array` : c), x += "\n" + z);
        r--;
        return x;
      }).filter(Boolean);
      return [...f, ...g, ...B].join("\n");
    }
    console.error("Could not compare two values: %s %s. Please file a bug with differently.", b, a);
  };
  return w(e, m);
}
const y = e => null === e ? !0 : "string number boolean symbol null undefined".split(" ").includes(typeof e), u = e => Array.isArray(e) ? `Array[${e.toString()}]` : e && e.toString ? e.toString() : `${e}`;
let A;
A = t(null, {});
console.log("%s\n", A);
A = t({}, null);
console.log("%s\n", A);
A = t(new Date(2018, 10), new Date(2017, 10));
console.log("%s\n", A);
A = t(new Date(2018, 10), []);
console.log("%s\n", A);
A = t(["test"], {});
console.log("%s\n", A);
A = t(10, "11");
console.log("%s\n", A);
A = t(Symbol("test"), !1);
console.log("%s\n", A);
A = t(Symbol("test"), new Date(2019, 10));
console.log("%s\n", A);
A = t({a:0, test:1, b:{f:10, c:[1, 3]}}, {a:0, g:2, b:{f:20, c:[1, 2]}});
console.log("%s\n", A);
console.log("%s\n", t([1], [2, Infinity]));


//# sourceMappingURL=depack.js.map