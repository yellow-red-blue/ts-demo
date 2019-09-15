import { isPlainObject } from './until'

function normalizeKey (header: any, key: string): void {
  Object.keys(header).forEach((k) => {
    if (k !== key && k.toUpperCase() === key.toUpperCase()) {
      header[key] = header[k]
      delete header[k]
    }
  })
}
export const setDefaultHeader = (header: any, data: any): any => {
  if (!isPlainObject(data)) {
    return
  }
  normalizeKey(header, 'Content-Type')
  if (header && !header['Content-Type']) {
    header['Content-type'] = 'application/json;charset=utf-8'
  }
  return header
}
