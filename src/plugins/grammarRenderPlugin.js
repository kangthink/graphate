// grammarRenderPlugin.js

const viva = require('./ngraphVivaGraph')


function svgText(width, height, text) {
  return viva.Graph.svg('text').text(text)
  .attr('fill', 'white')
  .attr('text-anchor', 'middle')
  .attr('width', width)
  .attr('height', height)
}

function svgRect(width, height) {
  return viva.Graph.svg('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', '#35b26f')
  .attr('x', -(width/2))
  .attr('y', -(height/2))
}

function svgConceptGroup(text, width, height, factor=1) {
  const group = viva.Graph.svg('g')

  let resizedWidth = factor * (width + 1)
  let resizedHeight = factor * (height + 1)
  group.appendChild(svgRect(resizedWidth, resizedHeight))
  group.appendChild(svgText(resizedWidth, resizedHeight, text))
  
  return group
}
// Set custom nodes appearance
const graphics = (function(){
  let grp = viva.Graph.View.svgGraphics()
  grp
    .node(function(node) {
      return svgConceptGroup(node.id, node.data.in, node.data.in, 3)
    })
    .placeNode(function(nodeUI, pos){
      if (nodeUI.tagName == 'g') {
        const transform = `translate(${pos.x},${pos.y})`
        nodeUI.attr('transform', transform)
      } else {
        // config data if it is not group
        // e.g. nodeUI.attr('x', pos.x - 12).attr('y', pos.y - 12)
      }
    })
    .link(function(edge) {
      return viva.Graph.svg("line")
        .attr("stroke", "#999")
        .attr("stroke-width", edge.data)
    })
    return grp
})()


const layout = function(graph) {
  const l = viva.Graph.Layout.forceDirected(graph, {
    springLength : 10,
    springCoeff : 0.005,
    dragCoeff : 0.02,
    gravity : -1.2
  })
  
  return l
}

function GrammarRenderPlugin(document, id) {
  this.document = document
  this.id = id
}

GrammarRenderPlugin.prototype.apply = function(ctx) {
  console.log(ctx)
  const renderer = viva.Graph.View.renderer(ctx.graph, {
    container: this.document.getElementById(this.id),
    graphics: graphics,
    laytout: layout(ctx.graph)
  })

  renderer.run()
}

module.exports = {
  GrammarRenderPlugin
}