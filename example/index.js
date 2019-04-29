/* alanode example/ */
import differently from '../src'

(async () => {
  const res = await differently({
    text: 'example',
  })
  console.log(res)
})()