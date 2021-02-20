const { ipcMain } = require('electron')
const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')
const _url = require('url')
const path = require('path')

const STATUS_MAP = {
  SUCCESS: {
    success: true,
    message: '下载成功'
  },
  LOADING: {
    status: 'loading'
  }
}

let fileList = []

const exitsFolder = (reaPath) => {
  const absPath = path.join('D:/test', reaPath);
  
  return new Promise((resolve, reject) => {
    fs.stat(absPath, function (err, stats) {
      if (!stats) {
        fs.mkdir(absPath, {recursive: true}, err => {
          if (err) {
            reject(err)
            return
          };
          resolve()
        });
      } else {
        resolve()
      }
    });
  })
}

const analyzePageImgList = (url) => {
  console.log('开始分析', url)
  request(url, (error, response, body) => {
    if (response && response.statusCode === 200) {
      const $ = cheerio.load(body)
      let imgs = []

      const folder = _url.parse(url).pathname ? _url.parse(url).pathname.replace('.html', '').replace(/\//g, '') : '';

      exitsFolder(folder).then(() => {
        $('img').each((i, e) => {  // 遍历所有
          const src = $(e).attr('src');
          imgs.push({
            folder,
            name: i,
            src,
          })
        })
        downLoadImgList(imgs)
      })
    }
    
  })
}

const downLoadImgList = (imgList) => {
  if (!Array.isArray(imgList)) {
    return
  }
  imgList.forEach(item => {
    request(item.src).pipe(fs.createWriteStream(path.join('D:/test', `/${item.folder}/${item.name}.jpg`)))
  })
}

ipcMain.on('knight-urls-download', (event, arg) => {
  // analyzePageImgList(arg.url)
  event.reply('knight-urls-reply', STATUS_MAP.SUCCESS)
})

analyzePageImgList('http://picxxxx.top/2021/02/16/3161.html')