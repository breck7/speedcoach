speedcoach
==========

Benchmark node.js modules to make them faster and lighter

Installation:

    npm install speedcoach -g

Command line usage:

    speedcoach express
    # 0.1S start to required +6.0MB
    speedcoach space
    # 0.0S start to required +0.1MB
    speedcoach fs 
    # 0.0S start to required +0.0MB
    speedcoach jquery
    # 0.6S start to required +36.4MB

Using in a script:

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

Running that script:

    node example.js

Example output:

    0.1S array initialized to string created +10.9MB 
    0.0S start to array initialized +0.9MB

Works in node.js or in the browser (tested with Chrome).
