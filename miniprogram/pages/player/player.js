Page({
  onShow(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context

    // let playerState = wx.getStorageSync('playerState')
    let player = wx.getBackgroundAudioManager()

    console.log("onshow " + player.title)
    this.setData({
      title: player.title,
      author:player.singer,
      src: player.src,
      status: player.paused // 1:playing, 0:stopped
    })
    // this.playAudio()
  },
  data: {
    
    title: '',
    author: '',
    src: '',
  },
  audioPlay() {
    wx.getBackgroundAudioPlayerState({
      success(res) {
        console.log("before")
        console.log(res)
      }
    })

    var audioCtx = wx.getBackgroundAudioManager()
    audioCtx.play()

    wx.getBackgroundAudioPlayerState({
      success(res) {
        console.log("after")
        console.log(res)
      }
    })
  },
  audioPause() {
    wx.getBackgroundAudioPlayerState({
      success(res) {
        console.log("before")
        console.log(res)
      }
    })

    var audioCtx = wx.getBackgroundAudioManager()
    audioCtx.pause()

    wx.getBackgroundAudioPlayerState({
      success(res) {
        console.log("after")
        console.log(res)
      }
    })
  },
  audio14() {
    var audioCtx = wx.getBackgroundAudioManager()
    audioCtx.seek(14)
  },
  audioStart() {
    var audioCtx = wx.getBackgroundAudioManager()
    audioCtx.seek(0)
  },

  playAudio() {
    let player = wx.getBackgroundAudioManager()

    // if (this.data.status == 0) {
    //   player.title = this.data.title
    //   player.src = this.data.src
    //   player.pause() 
    //   wx.getBackgroundAudioPlayerState({
    //     success(res) {
    //       player.seek(res.currentPosition)
    //     }
    //   })
    
      
    // }

    player.onPlay(() => {
      var newPlayerState = wx.getStorageSync('playerState')
      newPlayerState.status = 1
      wx.setStorageSync('playerState', newPlayerState)
    })

    player.onPause(() => {
      var newPlayerState = wx.getStorageSync('playerState')
      newPlayerState.status = 0
      wx.setStorageSync('playerState', newPlayerState)
    })

    player.onStop(() => {

    })

    player.onEnded(() => {
      var newPlayerState = wx.getStorageSync('playerState')
      newPlayerState.status = 0
      wx.setStorageSync('playerState', newPlayerState)
    })
  },

  onUnload() {
    let player = wx.getBackgroundAudioManager();
    player.stop();
  },

})