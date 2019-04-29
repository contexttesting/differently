import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import differently from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults(input) {
    const res = await differently({
      text: input,
    })
    return res
  },
  context: Context,
})