var request = require('request');
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();


var getUrlsFromDB = function (type) {
  return db.collection('radiostation').doc(type).get().then(res => {
    console.log(res.data.time);
    return res.data;
  }).catch(function (reason) {
    console.log('Get data failed', reason);
    return null;
  });
}

module.exports.getUrlsFromDB = getUrlsFromDB;