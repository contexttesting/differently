import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import differently from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof differently, 'function')
  },
  'compares different types'() {
    differently('test', 10)
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await differently({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T