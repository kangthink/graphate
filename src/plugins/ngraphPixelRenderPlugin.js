// ngraphrenderPlugin.js

const renderGraph = require('ngraph.pixel')

function NgraphPixelRenderPlugin(document, id) {
  this.document = document
  this.id = id
}

NgraphPixelRenderPlugin.prototype.apply = function(ctx) {
  const renderer = renderGraph(ctx.graph, {
    container: this.document.getElementById(this.id)
  })

  // renderer.run()
}

module.exports = {
  NgraphPixelRenderPlugin
}