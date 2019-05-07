// ngraphrenderPlugin.js

const viva = require('./ngraphVivaGraph')



// Set custom nodes appearance
const graphics = viva.Graph.View.svgGraphics();
graphics.node(function(node) {
       // The function is called every time renderer needs a ui to display node
       return viva.Graph.svg('text')
             .attr('width', 24)
             .attr('height', 24)
             .text(node.data.state); // node.data holds custom object passed to graph.addNode();
    })
    .placeNode(function(nodeUI, pos){
        // Shift image to let links go to the center:
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