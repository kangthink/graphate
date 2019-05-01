const { Graphate } = require('../src/graphate')

test('graphate object should have context property by default', () => {
  const graphate = new Graphate()
  expect(graphate.hasOwnProperty('context')).toBe(true)
})

test('graphate object should have plugins property by default', () => {
  const graphate = new Graphate()
  expect(graphate.hasOwnProperty('plugins')).toBe(true)
})