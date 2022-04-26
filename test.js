const Hash = require('./')
const { test } = require('brittle')

test('generate hashes', async ({ assert, plan }) => {
  plan(7)

  const a = Buffer.alloc(32, 1)
  const b = Buffer.alloc(32, 2)

  const state = new Hash()
  const seed = Buffer.from(state._hash)

  const first = state.hash(a)
  const second = state.hash(a)
  const third = state.hash(a)

  assert.unlike(first, second)
  assert.unlike(second, third)
  assert.unlike(first, third)

  const other = new Hash()
  assert.unlike(first, other.hash(a))

  const init = new Hash(seed)
  const same = init.hash(a)

  assert.alike(first, same)

  const bInit = new Hash(b)
  assert.unlike(same, bInit.hash(a))

  const init2 = new Hash(seed)
  assert.unlike(same, init2.hash(b))
})
