import http from 'node:http'

const PORT = 3333

const users = []

const server = http.createServer((request, response) => {
  const { method, url } = request

  const isGetMethod = method === 'GET'
  const isPostMethod = method === 'POST'

  const hasUserPath = url === '/users'

  if (isGetMethod && hasUserPath) {
    return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
  }

  if (isPostMethod && hasUserPath) {
    users.push({
      id: users.length + 1,
      name: 'John Doe',
      email: 'johndoe@email.com'
    })

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()
})

server.listen(PORT)
