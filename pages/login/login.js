import api from "../../api/api"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: wx.getStorageSync("username"),
    password: wx.getStorageSync("password"),
    usernameInputColor: "#ccc",
    passwordInputColor: "#ccc"
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
    } else {
      that.setData({
        password: e.detail.value
      })
    }
  },

  login() {

    api.login(this.data.username, this.data.password)
      .then(res => {
        app.saveUserData(res.data)
        wx.navigateBack()
      })
  },

  registerClick() {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  inputFocus(e) {
    const type = e.target.dataset.type
    var usernameInputColor, passwordInputColor
    if (type == "username") {
      usernameInputColor = app.globalData.mainThemeColor
      passwordInputColor = "#ccc"
    } else {
      usernameInputColor = "#ccc"
      passwordInputColor = app.globalData.mainThemeColor
    }
    this.setData({
      usernameInputColor: usernameInputColor,
      passwordInputColor: passwordInputColor
    })
  },
  inputBlur(e) {
    const type = e.target.dataset.type
    var usernameInputColor = this.data.usernameInputColor
    var passwordInputColor = this.data.passwordInputColor
    if (type == "username") {
      usernameInputColor = "#ccc"
    } else {
      passwordInputColor = "#ccc"
    }
    this.setData({
      usernameInputColor: usernameInputColor,
      passwordInputColor: passwordInputColor
    })
  }
})