var cheerio = require('cheerio');
var request = require("request");

const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()

// input: url
// output: raw Promise<html>
function getRawHtmlData(url) {
  // Setting URL and headers for request
  var options = {
    url: url,
  };
  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        // console.log(body);
        resolve(body);
      }
    })
  })
}

var errHandler = function (err) {
  console.log(err);
}

var $ = function (html) {
  return cheerio.load(html, { decodeEntities: false });
}

var extractMenu = function ($) {
  var urls = [];
  $('#menu-original li').children('a').each(function (idx, element) {
    var $element = $(element);
    urls.push({
      title: $element.text(),
      url: $element.attr('href')
    })
  });
  return urls;
}

var extractContent = function ($) {
  var urls = []
  $('p').each(function (idx, element) {
    var $element = $(element);
    var $element_a = $element.children('a');

    var title = $element.text();
    var url = $element_a.attr('href');
    if (title && url) {
      urls.push({
        title: title,
        url: url
      })
    }
  });
  return urls;
}

var extractMenuToDB = function () {
  var url = 'https://chineseradioseattle.com/';
  var dataPromise = getRawHtmlData(url);
  return dataPromise.then($, errHandler)
    .then(extractMenu, errHandler)
    .then(function (urlsdata) {
      var date = new Date();
      var timestamp = date.getTime();
      try {
        db.collection('radiostation').add({
          data: {
            _id: 'menu',
            urls: urlsdata,
            time: timestamp
          }
        });
        console.log("Write menu data succesfully to DB");
      } catch (e) {
        console.error(e)
      }
    }, errHandler)
}

var extractContentToDB = function (url) {
  var tmp = url.split('/');
  var type = tmp[tmp.length-2];
  var dataPromise = getRawHtmlData(url);
  return dataPromise.then($, errHandler)
    .then(extractContent, errHandler)
    .then(function (urlsdata) {
      var date = new Date();
      var timestamp = date.getTime();
      try {
        db.collection('radiostation').doc(type).set({
          data: {
           
            urls: urlsdata,
            time: timestamp
          },
           success(res) {
            console.log(res.data)
          }
        });
        console.log("Write data succesfully to DB: " + type);
      } catch (e) {
        console.error('Updateing ' + type + ' failed', e)
      }
    }, errHandler)
}

var getUrlsFromDB = function (type) {
  return db.collection('radiostation').doc(type).get().then(res => {
    console.log(res.data.time);
    return res.data;
  }).catch(function (reason) {
    console.log('Get data failed', reason);
    return null;
  });
}



module.exports.extractMenuToDB = extractMenuToDB;
module.exports.extractContentToDB = extractContentToDB;
module.exports.getUrlsFromDB = getUrlsFromDB;
module.exports.errHandler = errHandler;