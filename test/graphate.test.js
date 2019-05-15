/**
 * Copyright Taehoon Kang All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { Graphate } = require('../src/graphate')

test('graphate object should have context getter with default value', () => {
  const graphate = new Graphate()
  expect(graphate.context).toEqual({ graph: null, data: null })
})

test('graphate object should have plugins getter with default value', () => {
  const graphate = new Graphate()
  expect(graphate.plugins).toEqual([])
})

test('not allow to set value on context', () => {
  const graphate = new Graphate()
  graphate.context = ''
  expect(graphate.context).toEqual({ graph: null, data: null })
})

test('not allow to set value on plugins', () => {
  const graphate = new Graphate()
  graphate.plugins = ''
  expect(graphate.plugins).toEqual([])
})
