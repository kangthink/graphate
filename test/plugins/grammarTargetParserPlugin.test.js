// grammarTargetParserPlugin.test.js

let { Graphate } = require('../../src/graphate')
let { GrammarTargetParserPlugin } = require('../../src/plugins/grammarTargetParserPlugin')


test('GrammarTargetParser should parsed loaded data', () => {

  let graphate = new Graphate()
  configureLoadedData(graphate, loadedData)

  let plugin = new GrammarTargetParserPlugin('타겟')
  graphate.plugins.push(plugin)
  graphate.run()

  expect(graphate.context.data).toEqual(builtData())
})

test('GrammarTargetParser should throw error when none array value is passed through data', () => {
  function suite() {
    let graphate = new Graphate()
    configureNoneArrayData(graphate)
    let plugin = new GrammarTargetParserPlugin('타겟')
    graphate.plugins.push(plugin)
    graphate.run()
  }
  expect(suite).toThrowError('Array')
})


function configureLoadedData(graphate, data) {
  graphate.context.data = data()
}

function configureNoneArrayData(graphate) {
  graphate.context.data = 'nonArray'
}

function loadedData() {
  return [
    {
      '타겟': 'a, b, c',
      '이름': 'name01'
    },
    {
      '타겟': 'a, b',
      '이름': 'name02'
    },
    {
      '타겟': 'd',
      '이름': 'name03'
    }
  ]
}

function builtData() {
  return {
    nodes: [
      {id: 'a', data: { in: 2 }},
      {id: 'b', data: { in: 1 }},
      {id: 'c', data: { in: 0 }},
      {id: 'd', data: { in: 0 }},
    ],
    edges: [
      ['a', 'b', 2],
      ['b', 'c', 1],
    ]
  }
}
