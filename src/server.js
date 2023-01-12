import http from 'node:http'

import { json } from './middlewares/json.js'

const PORT = 3333

const users = []

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const isGetMethod = method === 'GET'
  const isPostMethod = method === 'POST'

  const hasUserPath = url === '/users'

  await json(request, response)

  if (isGetMethod && hasUserPath) {
    return response.end(JSON.stringify(users))
  }

  if (isPostMethod && hasUserPath) {
    const { name, email } = request.body

    users.push({
      id: users.length + 1,
      name,
      email
    })

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()
})

server.listen(PORT)
