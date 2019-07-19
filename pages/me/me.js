const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: app.globalData.isLogin,
    username: app.globalData.username
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    //监听isLogin的变化
    app.watch("isLogin", (val, old) => {
      that.setData({
        isLogin: val
      })
    })
  },

  clickBg() {
    const that = this
    const isLogin = that.data.isLogin
    if (!isLogin) {
      app.gotoLogin()
    }
  },

  clickItem(e) {
    const that = this
    const isLogin = that.data.isLogin
    const itemType = e.currentTarget.dataset.itemType
    switch (itemType) {
      case 'collect':
        if (isLogin) {
          that.gotoCollect()
        } else {
          app.gotoLogin()
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
        }
        break
      case 'meizi':
        that.gotoMeizi()
        break
      case 'github':
        that.gotoGithub()
        break
    }
  },

  gotoCollect() {
    wx.navigateTo({
      url: '../my-collect/my-collect',
    })
  },

  gotoMeizi() {
    wx.navigateTo({
      url: '../meizi/meizi',
    })
  },

  gotoGithub() {
    wx.setClipboardData({
      data: 'https://github.com/13588823551/WanAndroidMini',
      success(res) {
        app.gotoWeb('https://github.com/13588823551/WanAndroidMini', "WanAndroidMini")
        wx.showToast({
          title: '项目地址已复制',
          icon: 'none'
        })
      }
    })
    app.gotoWeb('https://github.com/13588823551/WanAndroidMini', "WanAndroidMini")
  },

  clickLogout() {
    const that = this
    wx.showModal({
      content: '是否退出登录',
      cancelColor: '#cccccc',
      confirmColor: '#fa8072',
      success(res) {
        if (res.confirm) {
          that.logout()
        }
      }
    })
  },

  logout() {
    app.clearUserData()
  }
})