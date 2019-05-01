// ngraphrenderPlugin.js

const viva = require('./ngraphVivaGraph')

function NgraphRenderPlugin(document, id) {
  this.document = document
  this.id = id
}

NgraphRenderPlugin.prototype.apply = function(ctx) {
  const renderer = viva.Graph.View.renderer(ctx.graph, {
    container: this.document.getElementById(this.id)
  })

  renderer.run()
}

module.exports = {
  NgraphRenderPlugin
}