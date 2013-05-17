var speedcoach = require('speedcoach')
speedcoach('start')

var numbers = []
for (i = 0 ; i < 99999; i++) {
  numbers.push(i)
}

speedcoach('array initialized')

var string = ''
for (i = 0 ; i < 99999; i++) {
  string += i
}

speedcoach('string created')

console.log(speedcoach.times())


