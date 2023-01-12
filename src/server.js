import http from 'node:http'
import { randomUUID } from 'node:crypto'

import { json } from './middlewares/json.js'
import { Database } from './database.js'

const PORT = 3333

const database = new Database()

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const isGetMethod = method === 'GET'
  const isPostMethod = method === 'POST'

  const hasUserPath = url === '/users'

  await json(request, response)

  if (isGetMethod && hasUserPath) {
    const users = database.select('users')

    return response.end(JSON.stringify(users))
  }

  if (isPostMethod && hasUserPath) {
    const { name, email } = request.body

    const user = {
      id: randomUUID(),
      name,
      email
    }

    database.insert('users', user)

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()
})

server.listen(PORT)
