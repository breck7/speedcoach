var _ = require('underscore')
/**
 * @param {string}
 */
function speedcoach(mark) {
  var mem = process.memoryUsage()
  speedcoach.marks.push([mark, new Date().getTime(), [mem.rss, mem.heapTotal, mem.heapUsed]])
  return this
}
speedcoach.marks = []

/**
 * @return {string}
 */
speedcoach.times = function () {
  var times = ''
  var spans = []
  _.each(speedcoach.marks, function (element, index, list) {
    if (index + 1 >= list.length)
      return false
    var next = list[index + 1]
    spans.push([
      element[0] + ' to ' + next[0],
      // elapsed time
      next[1] - element[1],
      // increased mem usage
      next[2][0] - element[2][0]
    ])
  })
  var sorted = _.sortBy(spans, function(span){ return span[1] }).reverse()
  _.each(sorted, function (element) {
    times += (element[1]/1000).toFixed(1) + 'S ' + element[0] + ' +' + (element[2]/1000000).toFixed(1) + 'MB \n'
  })
  return times
}

module.exports = speedcoach
