import { equal } from 'zoroaster/assert'
import Context from '../context'
import differently from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof differently, 'function')
  },
  'compares different types'() {
    return differently('test', 10)
  },
  'compares objects'() {
    return differently(
      { test: 'test', hello: true, obj: { innerA: true, innerC: 100 } },
      { test: 10, world: false, obj: { innerB: false, innerC: 100 } })
  },
  'compares objects with arrays'() {
    return differently(
      { test: [1, 2, 3, 5, 6] },
      { test: [1, 2, 4, 5, 7, Infinity] })
  },
  'compares arrays'() {
    return differently([10], [20])
  },
}

export default T