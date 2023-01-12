import http from 'node:http'

const PORT = 3333

const users = []

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const isGetMethod = method === 'GET'
  const isPostMethod = method === 'POST'

  const hasUserPath = url === '/users'

  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }

  if (isGetMethod && hasUserPath) {
    return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
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
