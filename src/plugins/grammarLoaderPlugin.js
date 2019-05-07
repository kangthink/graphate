// grammarLoaderPlugin.js

function GrammarLoaderPlugin(option) {
    this.option = option
  }
  
  GrammarLoaderPlugin.prototype.apply = function(ctx) {
  
    const nodes = [
      { id: '가정법', data: { in: 5 } },
      { id: '가정법 과거', data: { in: 0 } },
      { id: '가정법 과거완료', data: { in: 0 } },
    ]
  
    const edges = [
      ['가정법 과거', '가정법', 4],
      ['가정법 과거완료', '가정법', 1],
    ]
  
    ctx.data = { nodes, edges }
  }
  
  module.exports = {
    GrammarLoaderPlugin
  }