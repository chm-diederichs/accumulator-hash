# accumulator-hash

Hash and xor to generate unique byte strings

*IMPORTANT*: This is not intended to be a cryptographically-secure, but rather a convenience class for generating unique references.

## Usage
```js
const State = require('accumulator-hash')

const input = Buffer.from('hello, world!')
const state = new State()

const a = state.hash(input)
const b = state.hash(input)
const c = state.hash(input)

// a !== b !== c

```

## API

#### `const state = new State([init])`

Instantiate a new state. `init` can be supplied to initialise the state buffer. If it is not supplied, a random `init` buffer is generated.

#### `const hash = state.hash(data)`

Hash some data.