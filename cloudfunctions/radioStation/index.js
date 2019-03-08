var utils = require('./utils')
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return utils.getUrlsFromDB(event.type);
}