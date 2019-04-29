import { c } from 'erte'

const log = (t, ...args) => {
  let j = -1
  const s = t.replace(/%s/g, () => {
    j++
    return args[j]
  })
  return s
}

/**
 * Compare JS Objects With Color Difference.
 */
export default function differently(objectA, objectB) {
  let level = 0
  // let s = ''

  const write = (was, became) => {
    const i = ' '.repeat(level * 2)
    const b = became !== undefined ? c('+ ' + toString(became), 'green') : null
    const w = was !== undefined ? c('- ' + toString(was), 'red') : null
    const t = []
    if (w) t.push(log('%s%s', i, w))
    if (b) t.push(log('%s%s', i, b))
    return t.join('\n')
  }
  const writeCommon = (propName) => {
    const i = ' '.repeat(level * 2)
    return log('%s%s', i, propName)
  }
  const compare = (a, b) => {
    if (a instanceof Date && b instanceof Date) {
      if (!compareDates(a, b)) {
        return write(a, b)
      }
    } else if (
      (a instanceof Date && !(b instanceof Date)) ||
      (!(a instanceof Date) && b instanceof Date) ||
      (Array.isArray(a) && !Array.isArray(b)) ||
      (!Array.isArray(a) && Array.isArray(b))
    ) {
      return write(a, b)
    } else if (
      (isPrimitive(a) && isPrimitive(b)) ||
      (!isPrimitive(a) && isPrimitive(b)) ||
      (isPrimitive(a) && !isPrimitive(b))
    ) {
      if (a != b) return write(a, b)
    } else if (a.constructor && !b.constructor) {
      return write(a.constructor.name, b)
    } else if (!a.constructor && b.constructor) {
      return write(a, b.constructor.name)
    } else if (a.constructor && b.constructor) {
      if (a.constructor.name != b.constructor.name) {
        return write(a.constructor.name, b.constructor.name)
      }
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      const updated = a.map((valA, i) => {
        const valB = b[i]
        let ca = compare(valA, valB)
        if (ca) ca = `${writeCommon(`[${i}]`)}\n${ca}`
        return ca
      }).filter(Boolean)
      return updated.join('\n')
    }
    if (typeof a == 'object' && typeof b == 'object') {
      const added = []
      const removed = []
      const common = []
      Object.keys(a).forEach((k) => {
        if (!(k in b)) removed.push(k)
        else common.push(k)
      })
      Object.keys(b).forEach((k) => {
        if (!(k in a)) added.push(k)
      })
      const R = removed.map(r => write(`${r}: ${toString(a[r])}`))
      const A = added.map(ad => write(undefined, `${ad}: ${toString(b[ad])}`))

      const updated = common.map((k) => {
        level++
        const written = compare(a[k], b[k])
        let u = ''
        if (written) {
          u += writeCommon(Array.isArray(a[k]) && Array.isArray(b[k]) ? `${k}.Array` : k)
          u += '\n' + written
        }
        level--
        return u
      }).filter(Boolean)

      const RA = [...R, ...A, ...updated].join('\n')

      return RA
    }
  }

  const s = compare(objectA, objectB)

  return s
}

const isPrimitive = a => {
  if (a === null) return true
  return ['string', 'number', 'boolean',
    'symbol', 'null', 'undefined'].includes(typeof a)
}

const toString = (p) => {
  if (Array.isArray(p)) return `Array[${p.toString()}]`
  if (p && p.toString) return p.toString()
  return `${p}`
  // return `${(p && 'toString' in p) ? p.toString() : p}`
}

/**
 * @param {!Date} a
 * @param {!Date} b
 */
const compareDates = (a, b) => {
  if (a.getTime() != b.getTime()) return false
}