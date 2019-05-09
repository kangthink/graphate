// googleDocsLoaderPlugin.js

function GoogleDocsLoaderPlugin(options) {
  this.options = options
}

GoogleDocsLoaderPlugin.prototype.apply = function(ctx) {
  ctx.data = 'loaded data!!'
}

module.exports = {
  GoogleDocsLoaderPlugin
}