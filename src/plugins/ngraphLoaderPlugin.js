// ngraphLoaderPlugin.js

function NgraphLoaderPlugin(option) {
  this.option = option
}

NgraphLoaderPlugin.prototype.apply = function(ctx) {

  const nodes = [
    { id: 'a', data: { state: 'off' }},
    { id: 'b', data: { state: 'off' }},
    { id: 'c', data: { state: 'off' }},
    { id: 'd', data: { state: 'off' }},
    { id: 'e', data: { state: 'off' }},
    { id: 'f', data: { state: 'on' }},
  ]

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