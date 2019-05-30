/**
 * Copyright (c) Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

function LoggingGraphPlugin() {}

LoggingGraphPlugin.prototype.apply = function(ctx) {
  console.log(ctx)
}

module.exports = {
  LoggingGraphPlugin
}