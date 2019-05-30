/**
 * Copyright (c) Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 'use strict'

const createGraph = require('ngraph.graph')

function NgraphBuilderPlugin() {}

NgraphBuilderPlugin.prototype.apply = function(ctx) {

  const graph = createGraph()
  
  ctx.data.nodes.forEach(node => {
    graph.addNode(node.id, node.data)
  })

  ctx.data.edges.forEach(edge => {
    const [startNode, endNode] = edge
    graph.addLink(startNode, endNode)
  })

  ctx.graph = graph
}

module.exports = {
  NgraphBuilderPlugin
}
