import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read () {
    const counter = this.index++

    setTimeout(() => {
      if (counter > 100) {
        this.push(null)
      } else {
        const counterBuffer = Buffer.from(String(counter))

        this.push(counterBuffer)
      }
    }, 1000)
  }
}

class MultiplyByTenStream extends Writable {
  _write (chunk, encoding, callback) {
    const number = Number(chunk.toString())

    console.log(number * 10)

    callback()
  }
}

class InverseNumber extends Transform {
  _transform (chunk, encoding, callback) {
    const transformed = String(Number(chunk.toString()) * -1)

    callback(null, Buffer.from(transformed))
  }
}

new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTenStream())
