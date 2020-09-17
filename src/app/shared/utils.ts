export const isNull = (value?: any) => value === null

export const isNotNull = (value?: any) => !isNull(value)

export const isUndefined = (value?: any) => value === undefined

export const isNotUndefined = (value?: any) => !isUndefined(value)

export const isNullOrUndefined = (value?: any) =>
  isNull(value) || isUndefined(value)

export const isNeitherNullNorUndefined = (value?: any) =>
  !isNullOrUndefined(value)
