import { isPlainObject } from './until'

function normalizeKey(header: any, key: string): void {
  Object.keys(header).forEach(k => {
    if (k !== key && k.toUpperCase() === key.toUpperCase()) {
      header[key] = header[k]
      delete header[k]
    }
  })
}
export const setDefaultHeader = (header: any, data: any): any => {
  if (!isPlainObject(data)) {
    return header
  }
  normalizeKey(header, 'Content-Type')
  if (header && !header['Content-Type']) {
    header['Content-type'] = 'application/json;charset=utf-8'
  }
  return header
}

export const parseHeader = (headers: string): any => {
  if (!headers) {
    return
  }
  let header = Object.create(null)

  const headersArr = headers.split('\r\n')
  headersArr.forEach(it => {
    if (it) {
      let [key, value] = it.split(':')
      if (!key) {
        return
      }
      header[key] = value ? value.trim() : ''
    }
  })
  return header
}
