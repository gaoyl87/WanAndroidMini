import api from "../../api/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "搜索",
    hotWords: [],
    inputColor: "#ccc",
    input: "",
    historyWords: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    that.requestRemoteData()

    wx.getStorage({
      key: 'historyWords',
      success: function(res) {
        that.setData({
          historyWords: res.data
        })
      },
    })
  },

  /**
   * 请求网络数据
   */
  requestRemoteData() {
    this.getHotWords()
  },

  /**
   * 获取搜索热词
   */
  getHotWords() {
    const that = this
    api.getHotKey()
      .then(result => {
        /**
         * id: 6
         * link: ""
         * name: "面试"
         * order: 1
         * visible: 1
         */
        const hotWords = result.data
        //根据order从小到大排序
        hotWords.sort(function(a, b) {
          return a.order - b.order
        })
        const hotWordsName = []
        for (var i = 0; i < hotWords.length; i++) {
          hotWordsName.push(hotWords[i].name)
        }
        that.setData({
          hotWords: hotWordsName
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  inputing(e) {
    this.setData({
      input: e.detail.value
    })
  },
  inputFocus() {
    this.setData({
      inputColor: app.globalData.mainThemeColor
    })
  },
  inputBlur() {
    this.setData({
      inputColor: "#ccc"
    })
  },
  clickSearch() {
    const hotWord = this.data.input
    this.saveHistory(hotWord)
    this.gotoSearch(hotWord)
  },
  //保存搜索记录
  saveHistory(word) {
    //热词和搜索历史里没有这个词，才能当做搜索记录
    if (this.data.hotWords.indexOf(word) < 0 && this.data.historyWords.indexOf(word) < 0) {
      let historyWords = this.data.historyWords
      historyWords.unshift(word)
      //只保留10个搜索词
      historyWords = historyWords.slice(0, 10)
      this.setData({
        historyWords: historyWords
      })
      wx.setStorage({
        key: 'historyWords',
        data: historyWords,
      })
    }
  },
  clickHotWord(e) {
    const hotWord = e.currentTarget.dataset.name
    this.gotoSearch(hotWord)
  },
  gotoSearch(hotWord) {
    wx.navigateTo({
      url: "search-result/search-result?word={word}".format({
        word: hotWord
      })
    })
  }
})