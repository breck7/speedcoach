/**
 * @param string
 */
function speedcoach(mark) {
  if (!speedcoach.on)
    return this
  if (speedcoach.isNode) {
    var mem = process.memoryUsage()
    speedcoach.marks.push([mark, new Date().getTime(), [mem.rss, mem.heapTotal, mem.heapUsed]])
  }
  else
    speedcoach.marks.push([mark, new Date().getTime()])

  return this
}

speedcoach.isNode = false
speedcoach.on = true

if (typeof require !== 'undefined') {
  speedcoach.isNode = true
}

speedcoach.marks = []

/**
 * @return string
 */
speedcoach.times = function () {
  var times = '',
      spans = []

  speedcoach.marks.forEach(function (element, index, list) {
    if (index + 1 >= list.length)
      return false
    var next = list[index + 1]
    // Marks and time
    var entry = [element[0] + ' to ' + next[0], next[1] - element[1]]
    // Mem
    if (speedcoach.isNode)
      entry.push(next[2][0] - element[2][0])
    spans.push(entry)
  })

  var sorted = spans.sort(function(a,b){
    return (a > b ? 1 : null) || (a < b ? -1 : 0)
  }).reverse()

  sorted.forEach(function (element) {
    var mem = ''
    if (speedcoach.isNode)
      mem = ' +' + (element[2]/1000000).toFixed(2) + 'MB '
    times += (element[1]/1000).toFixed(2) + 'S ' + element[0] + mem + '\n'
  })

  return times
}

/**
 * @param dontClear Set to true to not clear the marks
 * @return string
 */
speedcoach.print = function (dontClear) {
  var data = '\n' + speedcoach.times(),
      clear = !dontClear

  if (!speedcoach.on)
    return;

  if (console.debug)
    console.debug(data)
  else
    console.log(data)

  if (clear)
    speedcoach.marks = []

  return data
}

// Export Space for use in Node.js
if (typeof exports !== 'undefined')
  module.exports = speedcoach;
