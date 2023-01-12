import http from 'node:http'

const PORT = 3334

const server = http.createServer(async (request, response) => {
  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  const requestBody = Buffer.concat(buffers).toString()

  console.log({ requestBody })

  return response.end(requestBody)
})

server.listen(PORT)
