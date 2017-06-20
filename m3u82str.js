
const request = require('request');
const fx = require('fs-extra');
const fs = require('fs');
const cheerio = require('cheerio');
const argv = require('minimist')(process.argv.slice(2));
const sutil = require('./subtitle_util');

const getContentFromUrl = function (url) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        resolve(body);
      } else {
        const errorMessage = '[!] Cannot download '+url;
        reject(errorMessage);
      }
    });
  });
}

const saveStr = async (webvttFilesLines, fileName) => {
  webvttFilesLines = webvttFilesLines.filter((line) => line.indexOf("WEBVTT") !== 0 && line.indexOf("X-TIMESTAMP-MAP") !== 0);
  webvttFilesLines = sutil.webvttLinesToSrtLines(webvttFilesLines);
  return new Promise(function(resolve, reject) {
    fx.outputFile(fileName, webvttFilesLines.join("\n"), function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}


const getWebvttFileUrls = async (m3u8Url) => {
  const urlArr = m3u8Url.split('/'); urlArr.pop();
  const urlPrefix = urlArr.join('/')+'/';
  const content = await getContentFromUrl(m3u8Url);
  let webvttFileNames = content.split("\n").filter((line, index) => line.indexOf("fileSequence") === 0);
  webvttFileNames = webvttFileNames.map((fileName) => urlPrefix+fileName);
  return webvttFileNames;
}

const downWebvtts2Srt = async (webvttFileNames) => {
  let webvttFilesLines = [];
  for (let i = 1; i < webvttFileNames.length; i++) {
    const fileUrl = webvttFileNames[i];
    console.log("[+] Start to download webvtt file: " + fileUrl);
    const content = await getContentFromUrl(fileUrl);
    lines = content.split("\n");
    webvttFilesLines = webvttFilesLines.concat(lines);
  }

  return webvttFilesLines;
}

(async () => {
  const m3u8Url = argv._[0] || argv.url;
  const srtFileName = (argv.fileName || Date.now())+'.srt';
  if (!m3u8Url) return console.log('[!] No m3u8 url provided exit()');
  //'https://p-events-delivery.akamaized.net/17qopibbefvoiuhbsefvbsefvopihb06/vod2/cc2/zho/prog_index.m3u8';
  let webvttFileNames = await getWebvttFileUrls(m3u8Url);
  //webvttFileNames = webvttFileNames.slice(0, 20);
  const webvttFileLines = await downWebvtts2Srt(webvttFileNames);
  await saveStr(webvttFileLines, srtFileName);
  console.log('[~] File have save to', srtFileName);
})();


