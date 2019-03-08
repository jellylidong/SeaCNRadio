var utils = require('./utils');
var menu = require('./menu.json')
const cloud = require('wx-server-sdk');

cloud.init()

exports.main = async (event, context) => {
  
  utils.extractMenuToDB();
  menu.urls.forEach(obj => {
    // obj.url is not in blacklist
    if(menu.blacklist.indexOf(obj.url) == -1) {
      utils.extractContentToDB(obj.url);
    }
  })
  
  
}