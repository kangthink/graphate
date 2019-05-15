'use strict'

const { Graphate } = require('../../src/graphate')

const { GrammarTargetParserPlugin } = require('../../src/plugins/grammarTargetParserPlugin')
const { GrammarBuilderPlugin } = require('../../src/plugins/grammarBuilderPlugin')
const { GrammarRenderPlugin } = require('../../src/plugins/grammarRenderPlugin')
const { LoggingGraphPlugin } = require('../../src/plugins/loggingGraphPlugin')

var graphate = new Graphate()

const grammarParser = new GrammarTargetParserPlugin('Target')
const grammarBuilder = new GrammarBuilderPlugin()
const grammarRender = new GrammarRenderPlugin(window.document, 'graph')
const logggingGraphPlugin = new LoggingGraphPlugin()

graphate.plugins.push(grammarParser)
graphate.plugins.push(grammarBuilder)
graphate.plugins.push(grammarRender)
graphate.plugins.push(logggingGraphPlugin)

const axios = require('axios');

window.onload = function() {

  const link = prompt("Please enter url to fetch data from", "https://sheetdb.io/api/v1/n1xo2irsf4ozs")
  axios.get(link).then(res => {
    const { data } = res
    graphate.context.data = data
    graphate.run()
  })
}

