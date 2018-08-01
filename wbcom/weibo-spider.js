const fs = require('fs');
const request = require('request');
var iconv = require('iconv-lite');

const xhtml = require("./xhtml");
const  Thread = { 
    Sleep : function (d) {  
    return new Promise((a, r) => { 
    setTimeout(() => { 
      a() 
    }, d) 
  }) }
}
async function Main(keyword) {
        var sPage = 1;
        var sMaxPage = 1; 
        var MaxPage = 1;
        var keyword = keyword || 4268260004061253;
        
        while (sPage >= 1 && sPage <= sMaxPage)
        {
            var Url = "https://m.weibo.cn/api/comments/show?id="+keyword+"&page="+sPage;
            let html = await fetchHtml(Url);
            // console.log(JSON.stringify(JSON.parse(html).data));
            try {
                MaxPage = sMaxPage =JSON.parse(html).data.max;
                console.log("正在解析第"+sPage+"/"+MaxPage+"页")
                fs.writeFile("./resuts.json", unescape(JSON.stringify(JSON.parse(html).data).replace(/\\u/g, '%u')),{ 'flag': 'a' },function(e){
                    if(e) throw e;
                });
            } catch (error) {
                console.log(error)
            }
            sPage++;
            await Thread.Sleep(2000);
        }
        await Thread.Sleep(1000);
    console.log("done!");
}

function fetchHtml(url) {
    let cookies = fs.readFileSync('./cookies.txt');
    let headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36",
        'Accept-Language': 'en-US,en;q=0.5',
        'WeiboData-Type': 'application/x-www-form-urlencoded',
        'Charset': 'utf-8',
        'Connection': 'Keep-Alive',
        'cookie': cookies.toString()
    };
    let options = {
        method: 'GET',
        url: url, 
        headers: headers,
        gzip: true
    }
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                response.setEncoding('utf-8');
                resolve(response.body);
            } else {
                console.log('error');
            }
        })
    })
}

let argvs = process.argv;
let keyword = argvs[2];
Main(keyword);

// hooyes 2018