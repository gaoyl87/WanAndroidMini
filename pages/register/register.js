import api from "../../api/api"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    repassword: "",
    usernameInputColor: "#ccc",
    passwordInputColor: "#ccc",
    passwordInputColor2: "#ccc"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  inputing(e) {
    const that = this
    const type = e.target.dataset.type
    if (type === "username") {
      that.setData({
        username: e.detail.value
      })
    } else if (type === "password") {
      that.setData({
        password: e.detail.value
      })
    } else {
      that.setData({
        repassword: e.detail.value
      })
    }
  },

  register() {
    api.register(this.data.username, this.data.password, this.data.repassword)
      .then(res => {
        app.saveUserData(res.data)
        wx.navigateBack({
          delta: 2
        })
      })
  },
  inputFocus(e) {
    const type = e.target.dataset.type
    var usernameInputColor, passwordInputColor, passwordInputColor2
    if (type === "username") {
      usernameInputColor = app.globalData.mainThemeColor
      passwordInputColor = "#ccc"
      passwordInputColor2 = "#ccc"
    } else if (type === "password") {
      usernameInputColor = "#ccc"
      passwordInputColor = app.globalData.mainThemeColor
      passwordInputColor2 = "#ccc"
    } else {
      usernameInputColor = "#ccc"
      passwordInputColor = "#ccc"
      passwordInputColor2 = app.globalData.mainThemeColor
    }
    this.setData({
      usernameInputColor: usernameInputColor,
      passwordInputColor: passwordInputColor,
      passwordInputColor2: passwordInputColor2
    })
  },
  inputBlur(e) {
    const type = e.target.dataset.type
    var usernameInputColor = this.data.usernameInputColor
    var passwordInputColor = this.data.passwordInputColor
    var passwordInputColor2 = this.data.passwordInputColor2
    if (type === "username") {
      usernameInputColor = "#ccc"
    } else if (type === "password") {
      passwordInputColor = "#ccc"
    } else {
      passwordInputColor2 = "#ccc"
    }
    this.setData({
      usernameInputColor: usernameInputColor,
      passwordInputColor: passwordInputColor,
      passwordInputColor2: passwordInputColor2
    })
  }
})