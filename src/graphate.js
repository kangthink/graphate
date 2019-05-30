/**
 * Copyright (c) Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

class Graphate {

  constructor() {
    this._context = { graph: null, data: null }
    this._plugins = []
  }

  get context() {
    return this._context
  }

  get plugins() {
    return this._plugins
  }

  run() {
    this.plugins.forEach(plugin => {
      plugin.apply(this.context)
    })
  }
}

module.exports = {
  Graphate
}
