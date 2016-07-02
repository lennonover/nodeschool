//第一个异步 I/O！
var fs = require('fs'),
    path = require('path')

fs.readFile(process.argv[2],'utf-8',function (err, data){
	if (err) {
       return console.error(err);
    }
	var lineCount = data.split('\n').length - 1
	console.log(lineCount)
})
