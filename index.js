const sodium = require('sodium-universal')
const b4a = require('b4a')

const OFFSET = 13

module.exports = class RollingHash {
  constructor (init) {
    this._hash = b4a.alloc(32)

    if (init) {
      this._hash.set(init)
    } else {
      sodium.randombytes_buf(this._hash)
    }
  }

  hash (data) {
    const hash = b4a.alloc(32)

    sodium.crypto_generichash(hash, data)
    xor(hash, this._hash, OFFSET)

    this._hash.set(hash)

    return hash
  }
}

// in place xor
function xor (a, b, offset) {
  for (let i = 0; i < a.byteLength; i++) {
    a[i] ^= b[(i + offset) % b.byteLength]
  }
}
