/**
 * Copyright Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const viva = require('../render/ngraphVivaGraph')

// Set custom nodes appearance
const graphics = viva.Graph.View.svgGraphics()
graphics.node(function(node) {
  return viva.Graph.svg('text')
    .attr('width', 24)
    .attr('height', 24)
    .text(node.data.state)
})
  .placeNode(function(nodeUI, pos){
    nodeUI.attr('x', pos.x - 12).attr('y', pos.y - 12);
})


function NgraphRenderPlugin(document, id) {
  this.document = document
  this.id = id
}

NgraphRenderPlugin.prototype.apply = function(ctx) {
  const renderer = viva.Graph.View.renderer(ctx.graph, {
    container: this.document.getElementById(this.id),
    graphics: graphics
  })

  renderer.run()
}

module.exports = {
  NgraphRenderPlugin
}
