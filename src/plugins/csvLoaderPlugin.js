// csvLoaderPlugin.js
const loader = require('csv-load-sync')

function CSVLoaderPlugin(filePath) {
  this.filePath = filePath
  this.csv = loader(this.filePath)
}

CSVLoaderPlugin.prototype.apply = function(ctx) {
  ctx.data = this.csv
}

module.exports = {
  CSVLoaderPlugin
}
