const app = getApp().globalData

Page({
  onShow(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context

    // let playerState = wx.getStorageSync('playerState')
    
   
    let player = wx.getBackgroundAudioManager()
    
    this.setData({
      title: app.title,
      author:app.author,
      src: app.src,
      currentPosition:app.currentPosition,
      isPlaying: !player.paused // true:playing, false:paused
    })
    this.playAudio()

    
  },
  data: { 
    title: '',
    author: '',
    src: '',
    currentPosition:0,
    isPlaying: false
  },
  audioPlay() {
    var player = wx.getBackgroundAudioManager()
    if(!this.data.isPlaying) {
      this.setData({
        isPlaying: true
      })
      player.title = this.data.title
      player.startTime = this.data.currentPosition
      player.src = this.data.src
      
    }
    player.play()
  },
  audioPause() {
    var audioCtx = wx.getBackgroundAudioManager()
    audioCtx.pause()
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

    })

    player.onPause(() => {
      app.title = this.data.title
      app.author = this.data.author
      app.src = this.data.src
      app.isPlaying = false
      app.currentPosition = player.currentTime
      console.log("onPause triggered")
    })

    player.onStop(() => {
      app.title = this.data.title
      app.author = this.data.author
      app.src = this.data.src
      app.isPlaying = false
      app.currentPosition = player.currentTime
      console.log("onStop triggered")
    })

    player.onTimeUpdate(() => {
      console.log(player.currentTime)
    })

    player.onEnded(() => {

    })
  },

  onUnload() {
    let player = wx.getBackgroundAudioManager();
    player.stop();
  },

})