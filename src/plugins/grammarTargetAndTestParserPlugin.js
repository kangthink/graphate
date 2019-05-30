/**
 * Copyright (c) Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * GrammarTargetParserPlugin requires to get passed an array of 
 * objects having string grammar data on any property name
 * 
 * e.g. [{ k1: "concept1, concept2" }, { k1: "concept3, concept4"}]
 * 
 */
function GrammarTargetAndTestParserPlugin(fromKey) {
  this.fromKey = fromKey
  this.toKey = 'target'
}

GrammarTargetAndTestParserPlugin.prototype.apply = function(ctx) {
  if (!Array.isArray(ctx.data)) {
    throw new Error('Array should be set on context\'s data property to use this plugin')
  }

  const loadedData = ctx.data.slice()
  const parsedData = loadedData.map(obj => {
    const strTarget = obj[this.fromKey]
    const arrTarget = strTarget.split(",").map(t => { return t.trim() })
    return { 
      [this.toKey]: arrTarget,
      tests: extractTests(obj)
    }
  })

  let nodeIds = extractNodeIds(parsedData)
  let edges = extractEdges(parsedData)
  let testsForNodes = buildTestsForNodes(parsedData)
  let nodes = buildNodes(nodeIds, edges, testsForNodes)

  ctx.data = { nodes, edges }
}



function extractTests(row) {

  let result = []

  function keyForTest(key) {
    return key.includes('9급')
  }

  for (let key in row) {
    if (keyForTest(key)) {
      if (row[key] !== "") {

        if (row[key].includes(',')) {
          //
          const qgs = row[key].split(',')
          qgs.forEach(qg => {
            const s = `${key}: ${qg}`
            result.push(s)
          })

        } else {
          const s = `${key}: ${row[key]}`
          result.push(s)
        }
      }
    }
  }

  return result
}

function extractNodeIds(parsedData) {
  const data = parsedData.slice()
  let nodeSet = new Set()
  data.forEach(obj => {
    const targets = obj.target
    targets.forEach(t => {
      nodeSet.add(t)
    })
  })
  return Array.from(nodeSet)
}

function extractEdges(parsedData) {
  const data = parsedData.slice()

  let edges = []
  for (let idx in data) {
    const targets = data[idx].target

    if (targets.length < 2) continue
  
    for (let index in targets) {
      if (!isLastElement(index, targets)) {
        const numIndex = Number(index)
        const e = [targets[numIndex], targets[numIndex + 1], 1]
        edges.push(e)
      }
    }
  }

  let reduced = []
  for (let idx in edges) {
    const hasEqualEdgeAt = (arr, edge) => {
      for (let idx in arr) {
        let [start, end, ...rest] = arr[idx]
        if (start == edge[0] && end == edge[1]) {
          return idx
        }
      }
      return null
    
    }
    const equalAt = hasEqualEdgeAt(reduced, edges[idx])
    if (equalAt !== null) {
      ((index, arr) => { arr[index][2] += 1 })(equalAt, reduced)
    } else {
      reduced.push(edges[idx])
    }
  }
  
  return reduced
}

function isLastElement(index, arr) {
  return (Number(index) +1 == arr.length) ? true : false
}

function buildTestsForNodes(parsedData) {
  const data = parsedData.slice()

  let result = {}

  for (let idx in data) {
    const row = data[idx]
    const leaf = row.target.slice(-1)[0]
    result[leaf] = row.tests  
  }

  return result
}

function buildNodes(nodeIds, edges, testsForNodes) {
  let constructedNodes = nodeIds.map(id => {
    return { 
      "id": id,
      "data": {
        in: 0,
        tests: null
      }
    }
  })

  for (let index in edges) {
    const edge = edges[index]
    pushWeight(constructedNodes,edge)
    pushTests(constructedNodes, testsForNodes)
  }
 
  return constructedNodes
}

function pushWeight(nodes, edge) {
  const [start, _, weight] = edge
  for (let idx in nodes) {
    if(nodes[idx].id == start) {
      nodes[idx].data.in += weight
    }
  }
}

function pushTests(nodes, tests) {
  for (let idx in nodes) {
    if (tests.hasOwnProperty(nodes[idx].id)) {
      // console.log(nodes.data)
      
      nodes[idx].data.tests = tests[nodes[idx].id]
    }
  }
}

module.exports = {
  GrammarTargetAndTestParserPlugin
}
