import { AxiosRequest, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeader } from './helpers/header'
export default function xhr(config: AxiosRequest): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', params, header, responseType, timeout = 60000 } = config
    console.log(config)
    // ie5 6使用activeObject 不再兼容
    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
    }
    // 超时处理
    xhr.timeout = timeout
    xhr.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }
    xhr.open(method.toUpperCase(), url, true)

    // 监听事件变化
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 0) {
        return
      }
      const status = xhr.status
      const statusText = xhr.statusText
      const responseData = responseType !== 'text' ? xhr.response : xhr.responseText
      const responseHeader = parseHeader(xhr.getAllResponseHeaders())
      const response: AxiosResponse = {
        data: responseData,
        status,
        statusText,
        config,
        header: responseHeader,
        request: xhr
      }
      handleResponse(response)
      function handleResponse(response: AxiosResponse) {
        if (response.status >= 200 && response.status < 300) {
          resolve(response)
        } else {
          reject(new Error(`Request failed with status code ${response.status}`))
        }
      }
    }

    // 监听错误函数
    xhr.onerror = function handeError() {
      reject(new Error('Network Error'))
    }

    // 设置headers
    Object.keys(header).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete header[name]
      } else {
        xhr.setRequestHeader(name, header[name])
      }
    })
    xhr.send(data)
  })
}
