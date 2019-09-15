import { AxiosRequest } from './types/index'

export default function xhr (config: AxiosRequest) {
  const { data, url, method = 'get', params, header } = config
  console.log(config)
  // ie5 6使用activeObject 不再兼容
  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)
  console.log(header)
  Object.keys(header).forEach((name) => {
    if (data !== null && name.toLocaleLowerCase() === 'content-type') {
      delete header[name]
    } else {
      xhr.setRequestHeader(name, header[name])
    }
  })
  xhr.send(data)
}
