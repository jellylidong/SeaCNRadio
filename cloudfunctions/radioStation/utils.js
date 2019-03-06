var request = require('request');
var cheerio = request('cheerio');
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

function getHtmlPromise(url) {
  var options = {
    url: url
  }
  return new Promise(function (resolve, reject) {
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })
  });
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
  })
  return urls;
}

var extractContent = function ($) {
  var urls = [];
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

  })
  return urls;
}

