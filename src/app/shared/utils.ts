export const isNull = (value?: any) => value === null

export const isNotNull = (value?: any) => !isNull(value)

export const isUndefined = (value?: any) => value === undefined

export const isNotUndefined = (value?: any) => !isUndefined(value)

export const isNullOrUndefined = (value?: any) =>
  isNull(value) || isUndefined(value)

export const isNeitherNullNorUndefined = (value?: any) =>
  !isNullOrUndefined(value)

export const isStrings = (value?: any) =>
  Array.isArray(value) &&
  isUndefined((value as any[]).find((a) => typeof a !== 'string'))

export const isNumbers = (value?: any) =>
  Array.isArray(value) &&
  isUndefined((value as any[]).find((a) => typeof a !== 'number'))
