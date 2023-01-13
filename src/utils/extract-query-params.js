export function extractQueryParams (query) {
  const paramsArray = query.substr(1).split('&')

  const params = paramsArray.reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})

  return params
}
