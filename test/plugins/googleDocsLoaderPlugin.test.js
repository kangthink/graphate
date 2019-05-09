const { Graphate } = require('../../src/graphate')
const { GoogleDocsLoaderPlugin } = require('../../src/plugins/googleDocsLoaderPlugin')

test('googleDocLoader should configure loaded data on the context property as data', () => {

  let graphate = new Graphate()
  let googleDocLoaderPlugin = new GoogleDocsLoaderPlugin()

  graphate.plugins.push(googleDocLoaderPlugin)
  graphate.run()
  expect(graphate.context.data).toBe('d')

})




// graphate.context.data != null
// 어떤 형태의 데이터로 들어 있어야 함
