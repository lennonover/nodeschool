//第一个 I/O！
var fs = require('fs'),
    path = require('path')

readSync(fs.readFileSync(process.argv[2],'utf-8'))

function readSync(text) {
	var lineCount = text.split('\n').length - 1
	console.log(lineCount)
}