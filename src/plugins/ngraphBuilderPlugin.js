// ngraphBuilderPlugin.js

const createGraph = require('ngraph.graph')

function NgraphBuilderPlugin() {
  const name = 'NgraphBuilderPlugin'
}

NgraphBuilderPlugin.prototype.apply = function(ctx) {

  const graph = createGraph()
  
  ctx.data.nodes.forEach(node => {
    graph.addNode(node)
  })

  ctx.data.edges.forEach(edge => {
    // const { startNode, endNode } = edge
    graph.addLink(edge[0], edge[1])
  })

  ctx.graph = graph
}

module.exports = {
  NgraphBuilderPlugin
}