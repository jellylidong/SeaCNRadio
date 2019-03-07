var utils = require('./utils');
var menu = require('./menu.json')
const cloud = require('wx-server-sdk');

cloud.init()

exports.main = async (event, context) => {
  
  utils.extracMenuToDB();
  menu.urls.forEach(obj => {
    if(menu.blacklist.indexOf(obj.url) == -1) {
      // obj.url is not in blacklist
      utils.extractAllContentToDB(obj.url);
    }
  })
  
  
}