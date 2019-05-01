
const { Graphate } = require('../../src/graphate')
const { NgraphLoaderPlugin } = require('../../src/plugins/ngraphLoaderPlugin')
const { NgraphBuilderPlugin } = require('../../src/plugins/ngraphBuilderPlugin')
const { NgraphRenderPlugin } = require('../../src/plugins/ngraphRenderPlugin')
// const { NgraphPixelRenderPlugin } = require('../../plugins/ngraphPixelRenderPlugin')
const { LoggingGraphPlugin } = require('../../src/plugins/loggingGraphPlugin')

var graphate = new Graphate()

const ngraphLoader = new NgraphLoaderPlugin()
const ngraphBuilder = new NgraphBuilderPlugin()
const ngraphRenderPlugin = new NgraphRenderPlugin(window.document, 'graph')
// const ngraphPixelRenderPlugin = new NgraphPixelRenderPlugin(window.document, 'graph')
const logggingGraphPlugin = new LoggingGraphPlugin()

graphate.plugins.push(ngraphLoader)
graphate.plugins.push(ngraphBuilder)
graphate.plugins.push(ngraphRenderPlugin)
// graphate.plugins.push(ngraphPixelRenderPlugin)
graphate.plugins.push(logggingGraphPlugin)

graphate.run()
