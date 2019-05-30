/**
 * Copyright (c) Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 'use strict'

function GrammarLoaderPlugin(options) {
  this.options = options
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
