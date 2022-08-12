export function single<T>(param: T | T[]): T {
  if (Array.isArray(param)) {
    return param[0]
  }
  return param
}
