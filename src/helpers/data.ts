import { isPlainObject } from './until'

export const jsonStringData = (data: any): any => {
  console.log(isPlainObject(data) ? JSON.stringify(data) : data)
  return isPlainObject(data) ? JSON.stringify(data) : data
}
