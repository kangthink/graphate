const path = require('path')

module.exports = {
  entry: './grammar.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: 'Google Chrome'
  }
}


