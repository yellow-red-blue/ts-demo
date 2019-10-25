export const isPlainObject = (obj: any): obj is Object => {
	return Object.prototype.toString.apply(obj) === '[object Object]'
}

export const isArray = (arr: any): arr is any[] => {
	return Array.isArray(arr)
}

export const isDate = (date: any): date is Date => {
	return Object.prototype.toString.apply(date) === '[object Date]'
}

export const isNullOrUndefined = (param: any): param is null | undefined => {
	return param === null || param === undefined
}
