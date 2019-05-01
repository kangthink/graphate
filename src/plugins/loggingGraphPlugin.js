
function LoggingGraphPlugin() {
  const name = 'LoggingGraphPlugin'
}

LoggingGraphPlugin.prototype.apply = function(ctx) {
  console.log(ctx)
}

module.exports = {
  LoggingGraphPlugin
}