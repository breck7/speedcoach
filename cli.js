#!/usr/bin/env node
var speedcoach = require('./speedcoach.js')

if (process.argv.length < 3) {
  console.log('Usage: speedcoach packageName')
  process.exit()
}

var packageName = process.argv[2]

speedcoach('start')
var pkg = require(packageName)
speedcoach('required')
console.log(speedcoach.times())
