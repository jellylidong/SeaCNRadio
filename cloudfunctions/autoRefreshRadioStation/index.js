var utils = require('./utils');
var menu = require('./menu.json')
const cloud = require('wx-server-sdk');
const REFRESH_INTERVAL = 3; // same as the config.json, executed every 3 minutes

cloud.init()

exports.main = async (event, context) => {
  console.log("aaa")
  return new Promise(function (resolve, reject) {
    // utils.extractMenuToDB(); // put menu data to frontend instead of DB
    var min = new Date().getMinutes();
    var len = menu.urls.length
    var lo = min%len
    var hi = (min+REFRESH_INTERVAL)%len

    menu.urls.forEach(obj => {
      // obj.url is not in blacklist
      if (menu.blacklist.indexOf(obj.url) == -1) {
        let index = menu.urls.indexOf(obj)
        if(index >= lo && index < hi) {
          utils.extractContentToDB(obj.url);
        }
      }
    })
  })
  
  
}