// grammarBuilderPlugin.js

const createGraph = require('ngraph.graph')

function GrammarBuilderPlugin() {
  const name = 'NgraphBuilderPlugin'
}

GrammarBuilderPlugin.prototype.apply = function(ctx) {

  const graph = createGraph()
  
  ctx.data.nodes.forEach(node => {
    graph.addNode(node.id, node.data)
  })

  ctx.data.edges.forEach(edge => {
    // const { startNode, endNode } = edge
    graph.addLink(edge[0], edge[1], edge[2])
  })

  ctx.graph = graph
}

module.exports = {
    GrammarBuilderPlugin
}