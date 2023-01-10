import http from 'node:http'

const PORT = 3333

const server = http.createServer((request, response) => {
  return response.end('Hello World')
})

server.listen(PORT)