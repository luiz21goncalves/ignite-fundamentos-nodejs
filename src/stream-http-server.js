import http from 'node:http'
import { Transform } from 'node:stream'

const PORT = 3334

class InverseNumber extends Transform {
  _transform (chunk, encoding, callback) {
    const transformed = String(Number(chunk.toString()) * -1)

    console.log(transformed)

    callback(null, transformed)
  }
}

const server = http.createServer((request, response) => {
  request.on('data', (chunk) => chunk).pipe(new InverseNumber()).pipe(response)
})

server.listen(PORT)
