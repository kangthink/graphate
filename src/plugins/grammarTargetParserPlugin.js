/**
 * Copyright Taehoon Kang All Rights Reserved.
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
function GrammarTargetParserPlugin(fromKey) {
  this.fromKey = fromKey
  this.toKey = 'target'
}

GrammarTargetParserPlugin.prototype.apply = function(ctx) {

  if (!Array.isArray(ctx.data)) {
    throw new Error('Array should be set on context\'s data property to use this plugin')
  }
    
  const loadedData = ctx.data.slice()
  const parsedData = loadedData.map(obj => {
    const strTarget = obj[this.fromKey]
    const arrTarget = strTarget.split(",").map(t => { return t.trim() })
    return { [this.toKey]: arrTarget }
  })

  let node_ids = extractNodeIds(parsedData)
  let edges = extractEdges(parsedData)
  let nodes = buildNodes(node_ids, edges)

  ctx.data = { nodes, edges }
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

// each edge is an array as [start, end, count]
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

function buildNodes(nodeIds, edges) {
  let constructedNodes = nodeIds.map(id => {
    return { "id": id, "data": { in: 0 }}
  })
  for (let index in edges) {
    const edge = edges[index]
    pushWeight(constructedNodes,edge)
  }
 
  return constructedNodes
}


function isLastElement(index, arr) {
  return (Number(index) +1 == arr.length) ? true : false
}

// finds the same edge and increases the weight
function pushWeight(nodes, edge) {
  const [start, _, weight] = edge
  for (let idx in nodes) {
    if(nodes[idx].id == start) {
      nodes[idx].data.in += weight
    }
  }
}

module.exports = {
  GrammarTargetParserPlugin
}
