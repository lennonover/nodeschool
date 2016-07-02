//LS 过滤器 
//来打印出指定目录下的文件列表，并且以特定的文件名扩展名来过滤这个列表
var fs = require('fs'),
	path = require('path')

fs.readdir(process.argv[2], function (err, list) {
  list.filter(function (file) {
  	return path.extname(file) === '.' + process.argv[3]
  }).forEach(function (file) {
    console.log(file)
  })
})