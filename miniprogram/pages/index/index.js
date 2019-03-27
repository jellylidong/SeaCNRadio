const app = getApp()

Page({
  data: {
    head:[
      {
        name: '',
        id: 'nonaudio',
        open: true,
        urls: [
          { "title": "首页", "url": "https://chineseradioseattle.com/" },
          { "url": "https://chineseradioseattle.com/about/", "title": "电台简介" },
          { "title": "节目安排", "url": "https://chineseradioseattle.com/schedule/" },
          { "url": "https://chineseradioseattle.com/djs/", "title": "主播档案" },
          { "url": "https://chineseradioseattle.com/past_programs/", "title": "往期节目" },
          { "title": "加入会员", "url": "https://chineseradioseattle.com/membership/" },
          //{ "title": "网络电视", "url": "https://chineseradioseattle.com/saturday/crstv/" }
        ]
      },
    ],
    menu:[
      
      {
        name: '',
        id: 'firstpage',
        open: true,
        urls: [
          { "title": "时事三人谈", "url": "https://chineseradioseattle.com/newstalk_by_three/" },
          { "title": "网事如风", "url": "https://chineseradioseattle.com/hot_topics_on_the_web/" },
          { "url": "https://chineseradioseattle.com/love_and_feelings/", "title": "情感夜线" },
          { "title": "菁菁校园", "url": "https://chineseradioseattle.com/campus_life/" },
          { "title": "艺术人生", "url": "https://chineseradioseattle.com/entertainment_unlimited/" },
          { "title": "本地新闻", "url": "https://chineseradioseattle.com/seattlenews/" },
          { "title": "音乐节目", "url": "https://chineseradioseattle.com/music/" },
          // { "title": "电台广告", "url": "https://chineseradioseattle.com/crsads/" },
          { "url": "https://chineseradioseattle.com/children/", "title": "少儿节目" },
          { "title": "人在旅途", "url": "https://chineseradioseattle.com/travel/" },
          { "title": "家庭生活", "url": "https://chineseradioseattle.com/family_show/" },
          { "title": "美国故事", "url": "https://chineseradioseattle.com/american_stories/" },
          { "title": "读书观影", "url": "https://chineseradioseattle.com/books_movies/" },
        ]
      },
      {
        name: '欢乐星期六',
        id: 'saturday',
        open: false,
        urls: [
          { "title": "文学欣赏", "url": "https://chineseradioseattle.com/saturday/chinese_literature/" },
          { "title": "创业节目", "url": "https://chineseradioseattle.com/saturday/entrepreneurship/" },
          { "title": "交友节目", "url": "https://chineseradioseattle.com/saturday/make_friends/" },
          { "title": "台长信箱", "url": "https://chineseradioseattle.com/saturday/xiaoyuan_time/" },
          { "title": "曹律师信箱", "url": "https://chineseradioseattle.com/saturday/lawyer_cao_mailbox/" },
          { "title": "李市长信箱", "url": "https://chineseradioseattle.com/saturday/mayor_lee_mailbox/" },
          { "title": "西城美丽说", "url": "https://chineseradioseattle.com/saturday/seattle_fasion_talk/" },
          { "title": "天方夜谭", "url": "https://chineseradioseattle.com/saturday/chinese_dialects/" },
          { "title": "心灵港湾", "url": "https://chineseradioseattle.com/saturday/soul_harbor/" },
          //{ "title": "广播剧", "url": "https://chineseradioseattle.com/saturday/guangboju/" }, // need to parse specially
          { "title": "福音时间", "url": "https://chineseradioseattle.com/saturday/gospel_time/" },
          { "title": "这里是江苏", "url": "https://chineseradioseattle.com/saturday/jiangsu/" },
          { "title": "西雅图少年说", "url": "https://chineseradioseattle.com/saturday/youth_talk/" },
        ]
      },
      {
        name: '专家论坛',
        id: 'expert_talks',
        open: false,
        urls: [
          { "title": "每周财经", "url": "https://chineseradioseattle.com/expert_talks/weekly_finance/" },
          { "url": "https://chineseradioseattle.com/expert_talks/best_food_in_seattle/", "title": "舌尖上的西雅图" }
        ]
      },
      {
        name: '粵語頻道',
        id: 'cantonese',
        open: false,
        urls: [
          { "url": "https://chineseradioseattle.com/cantonese/cantonese_music/", "title": "粵語歌曲" },
          { "title": "粤韵畅谭", "url": "https://chineseradioseattle.com/cantonese/yueyun_talk/" },
          { "title": "吃喝玩樂西雅圖", "url": "https://chineseradioseattle.com/cantonese/eat_drink_play_fun_in_seattle/" },
          { "title": "跟我学粤语", "url": "https://chineseradioseattle.com/cantonese/learning_cantonese/" },
          { "title": "藝林漫話", "url": "https://chineseradioseattle.com/cantonese/art_show/" },
          { "title": "粵語頻道西城夜話", "url": "https://chineseradioseattle.com/cantonese/cantonese_yehua/" }
        ]
      }
    ]
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })

      console.log("aaaa" + app.globalData.test)
      return
    }

    this.getMenuData()
  },


  getMenuData: function() {
    const db = wx.cloud.database()
    db.collection('radiostation').doc('menu').get().then(res => {
      console.log(res.data.urls)
      var urls = res.data.urls
      var menuItems = []
      urls.forEach(url => menuItems.push({
        raw: url,
        str:JSON.stringify(url)}
        ))
      this.setData({
        menuItems: menuItems
      })
    }).catch(err => {
      console.log('get menu data failed', err)
    })
  },
  popUnsurported: function() {
    wx.showToast({
      title: '暂不支持',
      image: '../../assets/image/exclamation.png',
      duration: 1000
    })
  }

})
