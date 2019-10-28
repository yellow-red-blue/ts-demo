export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'

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
	requestResponse?: XMLHttpRequestResponseType
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
