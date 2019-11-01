import { AxiosRequest, AxiosPromise } from './types/index'
import xhr from './xhr'
import buildURL from './helpers/url'
import { jsonStringData } from './helpers/data'
import { setDefaultHeader } from './helpers/header'
function axios(config: AxiosRequest): AxiosPromise {
  // todo
  processRequestConfig(config)
  return xhr(config)
}
function processRequestConfig(config: AxiosRequest): void {
  config.header = processHeader(config)
  config.url = transformUrl(config.url, config.params)
  config.data = transformData(config.data)
}
function processHeader(config: AxiosRequest): void {
  const { header = {}, data } = config
  return setDefaultHeader(header, data)
}
function transformUrl(url: string, params?: any): string {
  return buildURL(url, params)
}

function transformData(data: any) {
  return jsonStringData(data)
}
export default axios
