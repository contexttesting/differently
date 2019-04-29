import differently from '../src'

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

log(differently([1], [2]))