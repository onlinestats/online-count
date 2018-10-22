const test = require('tape')
const Count = require('.')

const input = [6, 2, 6, 32, 2, 6, 3, 6, 7, 4, 3, 6, 21]

test('Simple test', (_) => {
  const c = Count()
  input.forEach(value => c(value))
  const result = c.values
  console.log(result)
  _.equal(c.n, 13)
  _.deepEqual(result, {
    32: 1,
    21: 1,
    7: 1,
    6: 5,
    4: 1,
    3: 2,
    2: 2
  })
  _.end()
})

test('Output one value', (_) => {
  const c = Count()
  input.forEach(value => c(value))
  _.equal(c.value(6), 5)
  _.equal(c.value(1000), 0)
  _.end()
})

const input2 = [6, 2, 6, 3, 6, 7, 4, 3, 6, 21]
const correct = {
  21: 0.1,
  7: 0.1,
  6: 0.4,
  4: 0.1,
  3: 0.2,
  2: 0.1
}

test('Calculate probabilities', (_) => {
  const c = Count()

  _.plan(Object.keys(correct).length + 2)
  input2.forEach(value => c(value))
  Object.keys(c.probs).forEach(key => {
    _.true(Math.abs(correct[key] - c.probs[key]) < 0.00001)
  })
  _.true(Math.abs(correct[3] - c.prob(3)) < 0.00001)
  _.equal(c.prob(5), 0)
})

test('Pass array', (_) => {
  const c = Count({countArrays: true})
  c(input2)
  _.plan(Object.keys(correct).length)
  Object.keys(c.probs).forEach(key => {
    _.true(Math.abs(correct[key] - c.probs[key]) < 0.00001)
  })
})
