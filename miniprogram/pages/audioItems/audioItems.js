// miniprogram/pages/ audioItems/audioItems.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id: '',
      title:'',
      url:'',
      audioItems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    var item = JSON.parse(options.item)
    var tmp = item.url.split('/');
    var id = tmp[tmp.length - 2];
    console.log('###')
    console.log(item)
    this.setData({
      title: item.title,
      id: id
    })

    this.getAudioData(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getAudioData: function (id) {
    const db = wx.cloud.database()
    db.collection('radiostation').doc(id).get().then(res => {
      console.log(res.data.urls)
      this.setData({
        audioItems: res.data.urls
      })
    }).catch(err => {
      console.log('get menu data failed', err)
    })
  },

  playAudio: function(event) {
    console.log(event.currentTarget.dataset.test.title)
    console.log("component tapped")
  }
})