export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
  | 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'

export interface AxiosRequest {
  url: string
  method?: Method
  data?: any
  params?: any
  header?: any
}