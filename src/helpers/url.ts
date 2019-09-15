import { isPlainObject, isArray, isDate } from './until'
import { isNullOrUndefined } from 'util'
export const encode = (val: string): string => {
  return encodeURIComponent(val).replace(/%40/g, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/g, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']')
}
export default function buildURL (url: string, params?: any): string {
  if (!params) {
    return url
  }
  let keys = Object.keys(params)
  let para = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    // tslint:disable-next-line: deprecation
    if (!isNullOrUndefined(params[key])) {
      para.push(key)
    }
  }
  let part: string[] = []
  para.forEach((p) => {
    const value = params[p]
    let val = []
    if (isArray(value)) {
      // 类型保护 需要 或者用Array.isArray  这样也可以进行类型保护
      val = value
      p += '[]'
    } else {
      val = [value]
    }
    val.forEach((v) => {
      if (isDate(v)) {
        console.log(v)
        v = v.toISOString()
      } else if (isPlainObject(v)) {
        v = JSON.stringify(v)
      }
      part.push(`${encode(p)}=${encode(v)}`)
    })
  })
  let serializedParams = part.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex > -1) {
      url = url.split('#')[0]
    }
    url += url.indexOf('?') === -1 ? `?${serializedParams}` : `&${serializedParams}`
  }
  return url
}
