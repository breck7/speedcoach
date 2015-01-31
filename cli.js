#!/usr/bin/env node
var speedcoach = require('./speedcoach.js')

console.log('speedcoach version 0.2.0')

if (process.argv.length < 3) {
  console.log('Usage: speedcoach packageName')
  process.exit()
}

if (!String.repeat) {
  String.prototype.repeat = function (count) {
    var str = ''

    for (var i = 0; i < count; i++) {
      str += this.toString()
    }

    return str   
  }
}

var packageName = process.argv[2],
    pkg,
    cwd = process.cwd().replace(/\/$/, '') + "/",
    folders = cwd.match(/\//g).length - 1,
    paths = [packageName];

// Since this is likely installed globally, manually recurse through paths in search of the module like so:
// global
// cwd+packageName
// cwd+node_modules/+packageName
// cwd+../+packageName
// cwd+../node_modules/+packageName
// cwd+../../+packageName
// cwd+../../node_modules/+packageName

for (var i = 0; i < folders; i++) {
  paths.push(cwd + "../".repeat(i) + packageName)
  paths.push(cwd + "../".repeat(i) + "node_modules/" + packageName)
}

speedcoach('start')

paths.forEach(function (p) {
  try {
    pkg = require(p)
    speedcoach('finished requiring ' + packageName)
    console.log(speedcoach.times())
    process.exit()
  } catch (e) {
  }
})

throw new Error(packageName + " not found")
