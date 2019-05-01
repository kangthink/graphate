// Graphate.js

function Graphate() {
  this.context = {
    graph: null,
    data: null
  }
  this.plugins = []
}

Graphate.prototype.run = function() {
  this.plugins.forEach(plugin => {
    plugin.apply(this.context)
  })
}

module.exports = {
  Graphate
}