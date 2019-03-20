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
    this.initAudioPlayer()
    
  },
  data: { 
    title: '',
    author: '',
    src: '',
    currentPosition:0,
    isPlaying: false,
    progress:0
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
      player.play()
    } else {
      this.setData({ 
        isPlaying: false,
        currentPosition: player.currentTime
       })
      player.pause()
    }
    
  },
  audioPause() {
    this.setData({
      isPlaying: false,
      currentPosition: player.currentTime
    })
    var audioCtx = wx.getBackgroundAudioManager()
    audioCtx.pause()
  },

  initAudioPlayer() {
    let player = wx.getBackgroundAudioManager()

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
      console.log(player.duration)
      this.setData({
        progress: 100*player.currentTime/player.duration})
    })

    player.onEnded(() => {

    })
  },

  onUnload() {
    let player = wx.getBackgroundAudioManager();
    player.stop();
  },

})