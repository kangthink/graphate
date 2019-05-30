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
      const length = node.data.tests ? node.data.tests.length * 3 : 1
      return svgConceptGroup(node.data, node.id, length, length, 3)
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
        .attr("stroke-width", 1)
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

function GrammarLeafRenderPlugin(document, id) {
  this.document = document
  this.id = id
}

GrammarLeafRenderPlugin.prototype.apply = function(ctx) {
  const renderer = viva.Graph.View.renderer(ctx.graph, {
    container: this.document.getElementById(this.id),
    graphics: graphics,
    laytout: layout(ctx.graph)
  })
  renderer.run()
}

// helper functions
function svgConceptGroup(data, text, width, height, factor=1) {
  const group = viva.Graph.svg('g')

  // console.log(data)
  group.appendChild(svgRect(width, height))
  group.appendChild(svgText(width, height, text))
  // debugger
  group.addEventListener('click', function() {
    const t = data.tests ? data.tests.join('\n') : '해당 타겟에 대한 문제 없음'

    document.getElementById('tests').innerText = text + '\n' + t
    // alert(t)
  })
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
  GrammarLeafRenderPlugin
}
