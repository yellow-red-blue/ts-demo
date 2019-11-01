export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'head'
  | 'options'
export type XMLHttpRequestResponseType = '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text'
export interface AxiosResponse {
  data: any
  statusText: string
  status: number
  config: AxiosRequest
  header: any
  request: any
}

export interface AxiosRequest {
  url: string
  method?: Method
  data?: any
  params?: any
  header?: any
  timeout?: number
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequest
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
