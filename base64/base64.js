let fs = require('fs');
let path = require('path');

//解析需要遍历的文件夹
let filePath = path.resolve('./images/');
let resultArr = [];
let item = {};

/**
 * 写入结果
 */
writeResuts = () => {
    fs.open("./resuts.txt", "w",function(e,fd){
        if(e) throw e;
        fs.writeFile(fd,JSON.stringify(resultArr),function(e){
            if(e) throw e;
            fs.closeSync(fd);
        })
    });
}

/**
 * 图片zhuanbase64
 * @param filePath 需要遍历的文件路径
 */
imgTobase = imgpath => {
    let imgname = imgpath.split("\\").pop();
    let bData = fs.readFileSync(imgpath);
    let base64Str = bData.toString('base64');
    let datauri = 'data:image/png;base64,' + base64Str;
    item.tit = imgname;
    item.src = datauri;
    resultArr.push(item)
    writeResuts()
    return datauri;
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
fileDisplay = filePath => {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,(err,files) => {
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach((filename)=>{
                //获取当前文件的绝对路径
                let filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,(eror,stats)=>{
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        let isFile = stats.isFile();//是文件
                        let isDir = stats.isDirectory();//是文件夹
                        // 是图片文件 转 64
                        isFile && imgTobase(filedir)
                            
                        //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        isDir && fileDisplay(filedir);
                        
                    }
                })
            });
        }
    });
}

//调用文件遍历方法
fileDisplay(filePath);
