App({
  onLaunch: function() {
    const data = this.loadUserData()
    this.setGlobalData({
      isLogin: data != null,
      username: (data != null) ? data.username : ""
    })

    wx.getSystemInfo({
      success: (result) => {
        this.globalData.statusBarHeight = result.statusBarHeight
        this.globalData.navHeight = result.statusBarHeight + 44
      }
    })
  },

  gotoWeb(url, title) {
    wx.navigateTo({
      url: "../web/web?url={url}&title={title}".format({
        url: encodeURIComponent(url),
        title: title
      })
    })
  },

  gotoLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  globalData: {
    userInfo: null,
    platform: null,
    statusBarHeight: 0,
    navHeight: 0,
    mainThemeColor: "#9370DB",
    mainFontColor: "#333",
    secondaryFontColor: "#aaa",
    white: "#fff",
    black: "#000",
    isLogin: false,
    username: "",
    _USER: "user"
  },

  saveUserData(data) {
    var isLogin = false
    var username = ""
    if (data != null) {
      isLogin = true
      username = data.username
    }
    this.setGlobalData({
      isLogin: isLogin,
      username: username
    })
    wx.setStorageSync(this.globalData._USER, data)
  },

  loadUserData() {
    return wx.getStorageSync(this.globalData._USER)
  },

  clearUserData() {
    this.saveUserData(null)
  },

  watchCallBack: {},
  watchingKeys: [],

  setGlobalData: function(obj) {
    // 为了便于管理，应通过此方法修改全局变量
    Object.keys(obj).map(key => {
      this.globalData[key] = obj[key];
    });
  },

  /** watch函数 */
  watch(key, cb) {
    this.watchCallBack = Object.assign({}, this.watchCallBack, {
      [key]: this.watchCallBack[key] || []
    });
    this.watchCallBack[key].push(cb);
    if (!this.watchingKeys.find(x => x === key)) {
      const that = this;
      this.watchingKeys.push(key);
      let val = that.globalData[key];
      Object.defineProperty(that.globalData, key, {
        configurable: true,
        enumerable: true,
        set(value) {
          const old = that.globalData[key];
          val = value;
          that.watchCallBack[key].map(func => func(value, old));
        },
        get() {
          return val
        }
      });
    }
  },
})