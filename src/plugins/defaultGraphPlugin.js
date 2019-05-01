
function DefaultGraphPlugin() {
    const name = 'defaultGraphPlugin'
}

DefaultGraphPlugin.prototype.apply = function(ctx) {
    ctx.graph = 'my Sample Graph'
}

module.exports = {
    DefaultGraphPlugin
}