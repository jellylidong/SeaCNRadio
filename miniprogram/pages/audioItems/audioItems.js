const app = getApp().globalData

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

    wx.showLoading({
      title: '载入数据中',
    })

    var url = options.url
    var title = options.title
    console.log(options.title)
    var tmp = url.split('/');
    var id = tmp[tmp.length - 2];

    this.setData({
      title: title,
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
      wx.hideLoading()
    }).catch(err => {
      console.log('get menu data failed', err)
    })
  },

  playAudio: function(event) {
    // console.log(event.currentTarget.dataset.audioInfo)
    console.log("component tapped")

    var audioInfo = event.currentTarget.dataset.audioInfo
    let title = audioInfo.title
    let url = audioInfo.url

    app.title = title
    app.author = "TBD"
    app.src = url
    app.currentPosition = 0
    

    let backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = title
    backgroundAudioManager.startTime = 0
    backgroundAudioManager.src = url
    backgroundAudioManager.singer = "TBD"
    

    wx.switchTab({
      url: "/pages/player/player"
    })
  }
})