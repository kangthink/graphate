// ngraphLoaderPlugin.js

function NgraphLoaderPlugin(option) {
  this.option = option
}

NgraphLoaderPlugin.prototype.apply = function(ctx) {

  const nodes = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  const edges = [
    ['a', 'c'],
    ['a', 'd'],
    ['b', 'f'],
  ]

  ctx.data = { nodes, edges }
}

module.exports = {
  NgraphLoaderPlugin
}