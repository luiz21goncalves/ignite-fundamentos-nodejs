import http from 'node:http'

const PORT = 3333

const server = http.createServer((request, response) => {
  const { method, url } = request

  const isGetMethod = method === 'GET'
  const isPostMethod = method === 'POST'

  const hasUserPath = url === '/users'

  if (isGetMethod && hasUserPath) {
    return response.end('List user')
  }

  if (isPostMethod && hasUserPath) {
    return response.end('Create user')
  }

  return response.end('Hello World')
})

server.listen(PORT)
