/**
 * Copyright (c) Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 'use strict'

const viva = require('../render/ngraphVivaGraph')

// Set custom nodes appearance
const linkColor = '#f4ee42'
const textColor = 'white'
const nodeColor = '#35b26f'
const borderColor = '#f4ee42'

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
        .attr("stroke", linkColor)
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
  const renderer = viva.Graph.View.renderer(ctx.graph, {
    container: this.document.getElementById(this.id),
    graphics: graphics,
    laytout: layout(ctx.graph)
  })
  renderer.run()
}

// helper functions
function svgConceptGroup(text, width, height, factor=1) {
  const group = viva.Graph.svg('g')

  let resizedWidth = factor * (width + 1)
  let resizedHeight = factor * (height + 1)
  group.appendChild(svgRect(resizedWidth, resizedHeight))
  group.appendChild(svgText(resizedWidth, resizedHeight, text))
  // debugger
  group.addEventListener('click', function() {console.log('clicked')})
  return group
}

function svgText(width, height, text) {
  return viva.Graph.svg('text').text(text)
  .attr('fill', textColor)
  .attr('text-anchor', 'middle')
  .attr('width', width)
  .attr('height', height)
  .attr('font-size', 3)
}

function svgRect(width, height) {
  return viva.Graph.svg('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', nodeColor)
  .attr('x', -(width/2))
  .attr('y', -(height/2))
  .attr('rx', width/2)
  .attr('stroke', borderColor)
}

module.exports = {
  GrammarRenderPlugin
}
