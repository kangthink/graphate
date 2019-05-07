
const { Graphate } = require('../../src/graphate')
const { GrammarLoaderPlugin } = require('../../src/plugins/grammarLoaderPlugin')
const { GrammarBuilderPlugin } = require('../../src/plugins/grammarBuilderPlugin')
const { GrammarRenderPlugin } = require('../../src/plugins/grammarRenderPlugin')
const { LoggingGraphPlugin } = require('../../src/plugins/loggingGraphPlugin')

var graphate = new Graphate()

const grammarLoader = new GrammarLoaderPlugin()
const grammarBuilder = new GrammarBuilderPlugin()
const grammarRenderPlugin = new GrammarRenderPlugin(window.document, 'graph')
const logggingGraphPlugin = new LoggingGraphPlugin()

graphate.plugins.push(grammarLoader)
graphate.plugins.push(grammarBuilder)
graphate.plugins.push(grammarRenderPlugin)
graphate.plugins.push(logggingGraphPlugin)

graphate.run()
