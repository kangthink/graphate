'use strict'

const { Graphate } = require('../../src/graphate')

const { GrammarTargetParserPlugin } = require('../../src/plugins/grammarTargetParserPlugin')
const { GrammarTargetAndTestParserPlugin } = require('../../src/plugins/grammarTargetAndTestParserPlugin')
const { GrammarBuilderPlugin } = require('../../src/plugins/grammarBuilderPlugin')
const { GrammarRenderPlugin } = require('../../src/plugins/grammarRenderPlugin')
const { GrammarLeafRenderPlugin } = require('../../src/plugins/grammarLeafRenderPlugin')
const { LoggingGraphPlugin } = require('../../src/plugins/loggingGraphPlugin')


// var leafGrahpate = new Graphate() 

// const grammarParser = new GrammarTargetParserPlugin('Target')
// const grammarRender = new GrammarRenderPlugin(window.document, 'graph')

// const grammarParser = new GrammarTargetAndTestParserPlugin('Target')
// const grammarBuilder = new GrammarBuilderPlugin()
// const grammarRender = new GrammarLeafRenderPlugin(window.document, 'graph')
// const logggingGraphPlugin = new LoggingGraphPlugin()

// (function(graphate) {
//   const grammarParser = new GrammarTargetAndTestParserPlugin('Target')
//   const grammarBuilder = new GrammarBuilderPlugin()
//   const grammarRender = new GrammarLeafRenderPlugin(window.document, 'graph')
//   const logggingGraphPlugin = new LoggingGraphPlugin()

//   graphate.plugins.push(grammarParser)
//   graphate.plugins.push(grammarBuilder)
//   graphate.plugins.push(grammarRender)
//   graphate.plugins.push(logggingGraphPlugin)

// })(leafGrahpate)


function buildLeafGraphate() {
  let graphate = new Graphate()
  const grammarParser = new GrammarTargetAndTestParserPlugin('Target')
  const grammarBuilder = new GrammarBuilderPlugin()
  const grammarRender = new GrammarLeafRenderPlugin(window.document, 'graph')
  const logggingGraphPlugin = new LoggingGraphPlugin()

  graphate.plugins.push(grammarParser)
  graphate.plugins.push(grammarBuilder)
  graphate.plugins.push(grammarRender)
  graphate.plugins.push(logggingGraphPlugin)

  return graphate
}

function buildTreeGraphate() {
  let graphate = new Graphate()
  const grammarParser = new GrammarTargetParserPlugin('Target')
  const grammarBuilder = new GrammarBuilderPlugin()
  const grammarRender = new GrammarRenderPlugin(window.document, 'graph')
  const logggingGraphPlugin = new LoggingGraphPlugin()

  graphate.plugins.push(grammarParser)
  graphate.plugins.push(grammarBuilder)
  graphate.plugins.push(grammarRender)
  graphate.plugins.push(logggingGraphPlugin)

  return graphate
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query variable %s not found', variable);
}


const axios = require('axios');

window.onload = function() {

  // const link = prompt("Please enter url to fetch data from", "https://sheetdb.io/api/v1/n1xo2irsf4ozs")
  const link = prompt("Please enter url to fetch data from", "https://sheetdb.io/api/v1/5a69huu6aklvt")
  axios.get(link).then(res => {
    const { data } = res

    const graphType = getQueryVariable('type')

    var graphate = null
    if (graphType == 'leaf') {
      graphate = buildLeafGraphate()
    } else {
      graphate = buildTreeGraphate()
    }

    graphate.context.data = data
    graphate.run()
  })
}

