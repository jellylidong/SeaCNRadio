const app = getApp().globalData

Page({
  
  onShow(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context

    // let playerState = wx.getStorageSync('playerState')
    
   
    let player = wx.getBackgroundAudioManager()
    player.coverImgUrl = "https://media1.fdncms.com/stranger/imager/u/original/37306944/original-1526512_10151856317206977_1192085383_n.jpg"//"https://cdn1.iconfinder.com/data/icons/streamline-share/60/cell-16-0-480.png"
    this.setData({
      title: app.title,
      author:app.author,
      src: app.src,
      currentPosition: app.currentPosition,
      duration:app.duration,
      progress: app.currentPosition / app.duration,
      progressLeftTime: this.transformTime(app.currentPosition),
      progressRightTime: this.transformTime(app.duration),
      isPlaying: !player.paused, // true:playing, false:paused.
      playIcon: (player.paused == undefined || player.paused)? 'icon-play': 'icon-pause'
    })
    this.initAudioPlayer()
    
  },
  data: { 
    title: '',
    author: '',
    src: '',
    currentPosition:0,
    duration:0,
    isPlaying: false,
    progress:0,
    progressLeftTime: '',
    progressRightTime:'',
    playIcon: ''
  },
  audioPlay() {
    var player = wx.getBackgroundAudioManager()
    if(!this.data.isPlaying) {
      this.setData({
        isPlaying: true,
        currentPosition: player.currentTime,
        duration: player.duration,
        progressLeftTime: this.transformTime(player.currentTime),
        progressRightTime: this.transformTime(player.duration),
        playIcon: 'icon-play'
      })
      player.title = this.data.title
      player.startTime = this.data.currentPosition
      player.src = this.data.src
      player.play()
    } else {
      this.setData({ 
        isPlaying: false,
        currentPosition: player.currentTime,
        duration: player.duration,
        progressLeftTime: this.transformTime(player.currentTime),
        progressRightTime: this.transformTime(player.duration),
        playIcon: 'icon-play'
       })
      player.pause()
    }
  },
  audioPause() {
    this.setData({
      isPlaying: false,
      currentPosition: player.currentTime,
      progressLeftTime: this.transformTime(player.currentTime),
      progressRightTime: this.transformTime(player.duration),
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
        playIcon: 'icon-play',
        currentPosition: player.currentTime,
        progressLeftTime: this.transformTime(player.currentTime),
        progressRightTime: this.transformTime(player.duration),
        isPlaying: false
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
        playIcon: 'icon-play',
        currentPosition: this.transformTime(player.currentTime),
        progressLeftTime: this.transformTime(player.currentTime),
        progressRightTime: this.transformTime(player.duration),
        isPlaying: false
      })
      console.log("onStop triggered")
    })

    player.onTimeUpdate(() => {
      //console.log(player.currentTime)
      //console.log(player.duration)
      this.setData({
        progress: player.currentTime / player.duration,
        currentPosition: player.currentTime,
        duration:player.duration,
        progressLeftTime: this.transformTime(player.currentTime),
        progressRightTime: this.transformTime(player.duration)
      })
      app.currentPosition = player.currentTime
      app.duration = player.duration
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