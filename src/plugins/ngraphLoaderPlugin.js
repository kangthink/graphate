/**
 * Copyright (c) Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function NgraphLoaderPlugin() {}

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