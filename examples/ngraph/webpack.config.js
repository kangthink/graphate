const path = require('path')

module.exports = {
  entry: './ngraph.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: 'Google Chrome'
  }
}


