//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },

  globalData: {
    title: null,
    author: null,
    src: null,
    currentPosition: 0,
    isPlaying:false

  }
})
