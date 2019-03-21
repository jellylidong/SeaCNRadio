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
      currentPosition:'00:00',
      duration:'00:00',
      percent: app.currentPosition / app.duration,
      isPlaying: !player.paused, // true:playing, false:paused.
      playIcon: (player.paused == undefined || player.paused)? 'icon-play': 'icon-pause'
    })
    this.initAudioPlayer()
    
  },
  data: { 
    title: '',
    author: '',
    src: '',
    currentPosition:'00:00',
    duration:'00:00',
    percent:0,
    isPlaying: false,
    progress:0
  },
  audioPlay() {
    var player = wx.getBackgroundAudioManager()
    if(!this.data.isPlaying) {
      this.setData({
        isPlaying: true,
        currentPosition: this.transformTime(player.currentTime),
        duration: this.transformTime(player.duration),
        playIcon: 'icon-play'
      })
      player.title = this.data.title
      player.startTime = this.data.currentPosition
      player.src = this.data.src
      player.play()
    } else {
      this.setData({ 
        isPlaying: false,
        currentPosition: this.transformTime(player.currentTime),
        duration: this.transformTime(player.duration),
        playIcon: 'icon-play'
       })
      player.pause()
    }
  },
  audioPause() {
    this.setData({
      isPlaying: false,
      currentPosition: this.transformTime(player.currentTime)
    })
    var audioCtx = wx.getBackgroundAudioManager()
    audioCtx.pause()
  },

  initAudioPlayer() {
    let player = wx.getBackgroundAudioManager()

    player.onPlay(() => {
      this.setData({
        playIcon: 'icon-pause'
      })
    })

    player.onPause(() => {
      app.title = this.data.title
      app.author = this.data.author
      app.src = this.data.src
      app.isPlaying = false
      app.currentPosition = player.currentTime
      app.duration = player.duration
      console.log("onPause triggered")
      this.setData({
        playIcon: 'icon-play'
      })
    })

    player.onStop(() => {
      app.title = this.data.title
      app.author = this.data.author
      app.src = this.data.src
      app.isPlaying = false
      app.currentPosition = player.currentTime
      app.duration = player.duration
      this.setData({
        playIcon: 'icon-play'
      })
      console.log("onStop triggered")
    })

    player.onTimeUpdate(() => {
      console.log(player.currentTime)
      console.log(player.duration)
      this.setData({
        progress: 100*player.currentTime/player.duration,
        percent: player.currentTime / player.duration,
        currentPosition: this.transformTime(player.currentTime),
        duration:this.transformTime(player.duration)

      })
    })

    player.onEnded(() => {

    })
  },

  onUnload() {
    let player = wx.getBackgroundAudioManager();
    player.stop();
  },

  transformTime(timeInSec) {
      var timeInSec = timeInSec|0
      var sec = (timeInSec%60)|0
      if(sec < 10) {
        sec = '0' + sec
      }
      var min = (timeInSec/60)|0
      if(min < 10) {
        min = '0' + min
      }

      return min + ':' + sec
  },

  goForward() {
    let player = wx.getBackgroundAudioManager()
    player.seek(player.currentTime + 10)
  }

})