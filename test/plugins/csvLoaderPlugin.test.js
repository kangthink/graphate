let { Graphate } = require('../../src/graphate')
let { CSVLoaderPlugin } = require('../../src/plugins/csvLoaderPlugin')


test('csvLoader should load csv file as a array \
  and configure graphate.context.data property with the loaded data',
  () => {
  let graphate = new Graphate()
  let csvLoaderPlugin = new CSVLoaderPlugin('./test/plugins/fixture/three_columns_with_header.csv')

  graphate.plugins.push(csvLoaderPlugin)
  graphate.run()
  
  const expected = [
    {
      "한글": "사과",
      "영어": "apple",
      "갯수": "2",
    },
    {
      "한글": "바나나",
      "영어": "banana",
      "갯수": "3",
    },
  ]
  expect(graphate.context.data).toEqual(expected)
})
