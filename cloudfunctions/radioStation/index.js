var utils = require('./utils')
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // return utils.getUrlsFromDB(event.type);
  const db = cloud.database()
  // console.log('aaa' + db.collection('radiostation').count())
  return db.collection('radiostation').add({
    data:{
      _id:'test',
      test:123
    }
  })
}