var speedcoach = require("./speedcoach"),
	numbers = [],
	string = ""

speedcoach("start")

for (i = 0 ; i < 99999; i++) {
  numbers.push(i)
}
speedcoach("array initialized")

for (i = 0 ; i < 99999; i++) {
  string += i
}
speedcoach("string created")

console.log(speedcoach.times())
